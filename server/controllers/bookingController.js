import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import Stripe from 'stripe';


// Function to check Availability of Room

const checkAvailability = async ({checkInDate, checkOutDate, roomId}) =>{

    try {
        const bookings = await Booking.find({
            room: roomId,
            checkInDate: {$lte: checkOutDate},
            checkOutDate: {$gte: checkInDate},
        });
        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (error) {
        console.log(error.message);
    }
    
}


// API to check availability of a room
// Post /api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res)=>{
    try {
        const {room, checkInDate, checkOutDate} = req.body;
        const isAvailable = await checkAvailability({checkInDate, checkOutDate, room});
        res.json({success: true, isAvailable});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// API to create a new booking
// Post /api/bookings/book
export const createBooking = async (req, res) =>{
    try {
        const {room, checkInDate, checkOutDate, guests} = req.body;
        const user = req.user._id;

        // Before Booking Check Availability

        const isAvailable = await checkAvailability({
            checkInDate, checkOutDate, room
        });

        if(!isAvailable){ 
            return res.json({success: false, message: "Room is not available"});
        }

        // get total price for room
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        // calculate total price
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        totalPrice *= nights;

        const booking =await Booking.create({
            user, room, hotel: roomData.hotel._id, guests: guests, checkInDate, checkOutDate, totalPrice
        });

        res.json({success: true, message: "Booking created successfully", booking});
        

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Failed to create booking"});
    }
};

// API to get all bookings for a user
// Get /api/bookings/user

export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate("room hotel").sort
        ({createdAt: -1});
        res.json({success: true, bookings});
    } catch (error) {
        res.json({success: false, message: "Failed to fetch bookings"});
    }
};

export const getHotelBookings = async (req, res) => {
        try {
            const hotel = await Hotel.findOne({owner: req.user._id});
        if(!hotel){
            return res.json({success: false, message: "Hotel not found"});
        }
        const bookings = await Booking.find({hotel: hotel._id.toString()}).populate("room hotel user").sort
        ({createdAt: -1});
        // Total bookings
        const totalBookings = bookings.length;
        // Total Revenue
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
        res.json({success: true, dashboardData: {totalBookings, totalRevenue}, bookings});

        console.log("Số lượng đơn hàng tìm thấy:", bookings.length);
    } catch (error) {
        res.json({success: false, dashboardData: "Failed to fetch bookings"});
    }
};


// API to pay an existing booking
// Post /api/bookings/pay
export const payBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;
        
        // Tìm booking và lấy luôn thông tin hotel, room để in ra hóa đơn
        const booking = await Booking.findById(bookingId).populate({
            path: 'room',
            populate: { path: 'hotel' }
        });

        if (!booking) {
            return res.json({ success: false, message: "Không tìm thấy đơn đặt phòng" });
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        // Tạo lại phiên thanh toán Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd', 
                        product_data: {
                            name: `${booking.room.hotel.name} - ${booking.room.roomType}`,
                            description: `Mã đơn: ${booking._id}`,
                        },
                        unit_amount: booking.totalPrice * 100, 
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/my-bookings?success=true`,
            cancel_url: `${process.env.FRONTEND_URL}/my-bookings?canceled=true`,

            metadata: {
                bookingId: booking._id.toString() // Gửi ID đơn hàng cho Stripe giữ hộ
            }
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi kết nối cổng thanh toán" });
    }
};

// ==========================================
// API hứng thông báo (Webhook) từ Stripe
// POST /api/bookings/webhook
// ==========================================
export const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; 
    
    // Khởi tạo stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    let event;

    try {
        // Stripe yêu cầu dùng express.raw() để kiểm tra chữ ký
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log(`❌ Lỗi Webhook: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Nếu sự kiện là "Khách đã thanh toán thành công"
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const bookingId = session.metadata.bookingId; // Lấy lại ID đơn hàng

        try {
            // Cập nhật Database: Đổi trạng thái thành Đã thanh toán (isPaid: true)
            await Booking.findByIdAndUpdate(bookingId, { isPaid: true });
            console.log(`✅ Đã cập nhật thanh toán thành công cho đơn: ${bookingId}`);
        } catch (error) {
            console.log("Lỗi cập nhật DB:", error);
        }
    }

    // Trả lời Stripe là "Tôi đã nhận được tin"
    res.json({ received: true });
};
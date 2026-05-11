import React, { useState, useEffect } from 'react' // 👉 Thêm useEffect
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const Dashboard = () => {

    const { currency, user, getToken, toast, axios } = useAppContext();
    const [dashboardData, setDashboardData] = useState({
        bookings: [],
        totalBookings: 0,
        totalRevenue: 0,
    });

    const fetchDashboardData = async () => {
        try {
            const token = await getToken({ template: 'backend' });
            console.log("TOKEN:", token);
            if (!token) return;

            const { data } = await axios.get('/api/bookings/hotel', {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (data.success) {
                // Cập nhật đúng cấu trúc data từ backend trả về
                setDashboardData({
                    bookings: data.bookings,
                    totalBookings: data.dashboardData.totalBookings,
                    totalRevenue: data.dashboardData.totalRevenue
                });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //Gọi hàm lấy dữ liệu khi trang web load
    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    return (
        <div className='p-6'> {/* Thêm padding cho dễ nhìn */}
            <Title align='left' font='Be Vietnam Pro' title='Dashboard' subTitle='Quản lý danh sách phòng, theo dõi đặt phòng và phân tích doanh thu.' />

            <div className='flex gap-4 my-8'>
                {/* Total Bookings */}
                <div className='bg-primary/5 border border-primary/10 rounded flex p-4 pr-8 min-w-[200px]'>
                    <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-10' />
                    <div className='flex flex-col sm:ml-4 font-bold'>
                        <p className='text-blue-600 text-lg font-lora'>Tổng lượt đặt</p>
                        <p className='text-neutral-600 text-2xl'>{dashboardData.totalBookings}</p>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className='bg-primary/5 border border-primary/10 rounded flex p-4 pr-8 min-w-[200px]'>
                    <img src={assets.totalRevenueIcon} alt="" className='max-sm:hidden h-10' />
                    <div className='flex flex-col sm:ml-4 font-bold'>
                        <p className='text-blue-600 text-lg font-lora'>Doanh thu</p>
                        <p className='text-neutral-600 text-2xl'>{currency}{dashboardData.totalRevenue.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Lịch sử đặt phòng</h2>
            
            <div className='w-full max-w-4xl text-left border border-gray-200 rounded-lg overflow-hidden shadow-sm'>
                <div className='max-h-96 overflow-y-auto'>
                    <table className='w-full text-sm'>
                        <thead className='bg-gray-50 sticky top-0'>
                            <tr>
                                <th className='py-4 px-6 text-gray-800 font-bold'>Người đặt</th>
                                <th className='py-4 px-6 text-gray-800 font-bold max-sm:hidden'>Loại phòng</th>
                                <th className='py-4 px-6 text-gray-800 font-bold text-center'>Giá</th>
                                <th className='py-4 px-6 text-gray-800 font-bold text-center'>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {dashboardData.bookings.length > 0 ? (
                                dashboardData.bookings.map((item, index) => (
                                    <tr key={index} className='hover:bg-gray-50 transition-colors'>
                                        <td className='py-4 px-6 text-gray-700 flex items-center gap-2'>
                                            <img src={item.user.image} className='w-8 h-8 rounded-full' alt="" />
                                            {item.user.username}
                                        </td>
                                        <td className='py-4 px-6 text-gray-700 max-sm:hidden'>
                                            {item.room.roomType}
                                        </td>
                                        <td className='py-4 px-6 text-gray-700 text-center'>
                                            {currency}{item.totalPrice.toLocaleString()}
                                        </td>
                                        <td className='py-4 px-6 text-center'>
                                            <span className={`py-1 px-3 text-[10px] font-bold rounded-full uppercase ${
                                                item.isPaid 
                                                    ? 'bg-green-100 text-green-700' 
                                                    : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {item.isPaid ? 'Hoàn tất' : 'Chờ trả tiền'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-10 text-center text-gray-400">Chưa có dữ liệu đặt phòng</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
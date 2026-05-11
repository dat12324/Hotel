import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) =>{
    try {
        const {name, address, contact, city} = req.body;
        const owner = req.user._id; 

        // Check if User already registered
        const hotel = await Hotel.findOne({owner});
        if(hotel){
            return res.json({success: false, message: "Hotel already registered"});
        }

        await Hotel.create({name, address, contact, owner, city});

        await User.findByIdAndUpdate(owner, {role: "hotelOwner"});
        res.json({success: true, message: "Hotel registered"});
        
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}
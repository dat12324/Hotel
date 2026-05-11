import express from "express";
import {payBooking } from "../controllers/bookingController.js";
import { 
    checkAvailabilityAPI, 
    createBooking, 
    getUserBookings, 
    getHotelBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/hotel', protect, getHotelBookings);
bookingRouter.post('/pay', protect, payBooking);

export default bookingRouter;
import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";

import clerkWebhooks from "./controllers/clerkWebhooks.js";
import { stripeWebhook } from "./controllers/bookingController.js";

import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";

import chatbotRoutes from "./routes/chatbotRoutes.js";


// ================= DB =================
connectDB();
connectCloudinary();


// ================= EXPRESS =================
const app = express();


// ================= HTTP SERVER =================
const httpServer = createServer(app);


// ================= SOCKET IO =================
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});


// ================= SOCKET EVENTS =================
io.on("connection", (socket) => {

    console.log("✅ User connected:", socket.id);

    socket.on("user_message", (msg) => {

        console.log("📩 USER:", msg);

        io.emit("admin_receive", msg);
    });

    socket.on("admin_reply", (data) => {

        console.log("📨 ADMIN:", data);

        io.emit("user_receive", data);
    });

    socket.on("disconnect", () => {

        console.log("❌ User disconnected");
    });
});


// ================= PORT =================
const PORT = process.env.PORT || 5000;


// ================= CORS =================
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "clerk-db-jwt"
    ],
    credentials: true
}));


// ================= WEBHOOK =================
app.post(
    "/api/bookings/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
);


// ================= MIDDLEWARE =================
app.use(express.json());

app.use(clerkMiddleware());


// ================= ROUTES =================
app.use("/api/clerk", clerkWebhooks);

app.use("/api/user", userRouter);

app.use("/api/hotels", hotelRouter);

app.use("/api/rooms", roomRouter);

app.use("/api/bookings", bookingRouter);

app.use("/api/offers", offerRoutes);

app.use("/api/chat", chatbotRoutes);


// ================= TEST =================
app.get("/", (req, res) => {

    res.send("TL-Stay Server Running");
});


// ================= START =================
httpServer.listen(PORT, () => {

    console.log(
        `🔥 Server running on port ${PORT}`
    );
});
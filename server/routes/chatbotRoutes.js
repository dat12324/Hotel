import express from "express";
import Booking from "../models/Booking.js";

import {
  detectIntents,
  getReplies,
  isFallback
} from "../AI/intentHandler.js";

const router = express.Router();

// lưu trạng thái user
let contexts = {};

router.post("/", async (req, res) => {

  try {

    const userId = req.body.userId || "guest";

    if (!contexts[userId]) {
      contexts[userId] = {};
    }

    const context = contexts[userId];

    const message = String(req.body.message || "")
      .toLowerCase()
      .trim();

    if (!message) {

      return res.json({
        reply: "Bạn chưa nhập tin nhắn",
        handoff: false
      });
    }

    console.log("🔥 MESSAGE:", message);

    // ================= DETECT INTENT =================
    const intents = detectIntents(message);

    console.log("🧠 INTENTS:", intents);

    // ================= START BOOKING =================
    if (intents.includes("booking") && !context.step) {

      context.step = "ask_checkin";

      return res.json({
        reply: "📅 Bạn muốn check-in ngày nào?",
        handoff: false
      });
    }

    // ================= STEP 1 =================
    if (context.step === "ask_checkin") {

      context.checkin = message;
      context.step = "ask_checkout";

      return res.json({
        reply: "📅 Bạn muốn check-out ngày nào?",
        handoff: false
      });
    }

    // ================= STEP 2 =================
    if (context.step === "ask_checkout") {

      context.checkout = message;
      context.step = "ask_people";

      return res.json({
        reply: "👨‍👩‍👧‍👦 Bạn đi bao nhiêu người?",
        handoff: false
      });
    }

    // ================= STEP 3 =================
    if (context.step === "ask_people") {

      context.people = message;

      const newBooking = await Booking.create({
        userId,
        checkin: context.checkin,
        checkout: context.checkout,
        people: context.people,
        createdAt: new Date()
      });

      contexts[userId] = {};

      return res.json({
        reply: `
✅ BOOKING DONE

📅 Check-in: ${newBooking.checkin}
📅 Check-out: ${newBooking.checkout}
👨 People: ${newBooking.people}

🆔 ID: ${newBooking._id}
        `,
        handoff: false
      });
    }

    // ================= FALLBACK =================
    if (isFallback(intents)) {

      return res.json({
        reply: "🤖 Mình chưa hiểu ý bạn.",
        handoff: true
      });
    }

    // ================= NORMAL CHAT =================
    const reply = getReplies(intents);

    return res.json({
      reply,
      handoff: false
    });

  } catch (err) {

    console.error("❌ CHAT ERROR:", err);

    return res.status(500).json({
      reply: "Server lỗi",
      error: err.message
    });
  }
});

export default router;
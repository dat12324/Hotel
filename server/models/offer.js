import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    priceOff: {
      type: Number,
      required: true,
      min: 1,
      max: 100
    },
    expiryDate: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);
export default Offer;

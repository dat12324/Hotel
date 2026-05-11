import Offer from "../models/offer.js";

// GET tất cả offers
export const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });

    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET offer theo ID
export const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "no deals found",
      });
    }

    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE offer mới
export const createOffer = async (req, res) => {
  try {
    const {
      title,
      description,
      priceOff,
      expiryDate,
      image,
    } = req.body;

    const newOffer = new Offer({
      title,
      description,
      priceOff,
      expiryDate,
      image,
    });

    const savedOffer = await newOffer.save();

    res.status(201).json({
      success: true,
      message: "create offer successfully",
      data: savedOffer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE offer
export const updateOffer = async (req, res) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedOffer) {
      return res.status(404).json({
        success: false,
        message: "no deals found",
      });
    }

    res.status(200).json({
      success: true,
      message: "update offer successfully",
      data: updatedOffer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE offer
export const deleteOffer = async (req, res) => {
  try {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.id);

    if (!deletedOffer) {
      return res.status(404).json({
        success: false,
        message: "no deals found",
      });
    }

    res.status(200).json({
      success: true,
      message: "delete offer successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
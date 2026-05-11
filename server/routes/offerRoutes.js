import express from "express";

import {
  getAllOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
} from "../controllers/offerController.js";

const router = express.Router();

// GET all
router.get("/", getAllOffers);

// GET by id
router.get("/:id", getOfferById);

// CREATE
router.post("/", createOffer);

// UPDATE
router.put("/:id", updateOffer);

// DELETE
router.delete("/:id", deleteOffer);

export default router;
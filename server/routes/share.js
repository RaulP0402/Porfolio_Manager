import express from "express";
import Share from "../models/Share.js";

const router = express.Router();

router.get("/shares", async (req, res) => {
    try{
        const shares = await Share.find();
        res.status(200).json(shares);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;
import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.put("/updates", async(req, res) => {
    try{
        const transactions = await Transaction.insertMany({
            amount: req.body.amount * 100,
            buyer: req.body.buyer,
            shareIds: [req.body.id]
        });
        
        res.status(200);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})


export default router;
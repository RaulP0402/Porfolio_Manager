import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const TransactionSchema = new Schema({
    amount: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100
    },
    buyer: String,
    shareIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Share"
        }
    ]
}, { timestamps: true, toJSON: { getters: true } }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
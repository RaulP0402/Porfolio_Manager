import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const ShareSchema = new Schema({
    ticker: String,
    pruchasePrice: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
        }
    ],
    }, 
    { timestamps: true, toJSON: { getters: true } }
);

const Share = mongoose.model("Share", ShareSchema);

export default Share;
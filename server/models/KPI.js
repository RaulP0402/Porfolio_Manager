import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const monthSchema = new Schema(
    {
        month: String,
        profit: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100
        },
        loss: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100
        },
        capitolAllocated: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100
        },
    },
    {toJson: { getters: true }}
);

const weekSchema = new Schema( 
    {
        date: String,
        profit: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100
        },
        loss: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100
        }
    },
    {toJSON: { getters: true }}
);

const holdingsSchema = new Schema(
    {
        ticker: String,
        quantity: Number,
        avgPurchasePrice: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100
        },
    },
    { toJSON: { getters: true }}
);

const KPISchema = new Schema(
    {
        capitol: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100
        }, 
        holdings: [holdingsSchema],
        monthlyData: [monthSchema],
        weeklyData: [weekSchema],
    },
    { timestamps: true, toJSON: { getters: true } },
);

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;

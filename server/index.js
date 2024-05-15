import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import shareRoutes from "./routes/share.js"
import transactionRoutes from "./routes/transaction.js";
import updateRoutes from "./routes/update.js";
// import Share from "./models/Share.js";
// import KPI from "./models/KPI.js";
// import Transaction from "./models/Transaction.js";
// import { kpis, shares, transactions } from "./data/data.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

/* ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/share", shareRoutes);
app.use("/transaction", transactionRoutes);
app.use("/update", updateRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then( async () => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
        /* ADD DATA ONE TIME ONLY OR AS NEEDED */
        // await mongoose.connection.db.dropDatabase();
        // KPI.insertMany(kpis);
        // Share.insertMany(shares);
        // Transaction.insertMany(transactions);
    })
    .catch((error) => console.log(`${error} did not connect`));

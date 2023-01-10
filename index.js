import express from "express";
import cors from "cors";

import { connectDB } from "./src/database/db.js";
import { PORT } from "./src/utils/config.js";

import userRoute from "./src/routes/User.js";
import productRoute from "./src/routes/Product.js";

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/users", userRoute);

app.use("/api/products", productRoute);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

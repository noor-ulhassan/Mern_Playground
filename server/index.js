import express from "express";
import dbConnect from "./database/dbConnect.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/auth.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);

dbConnect();

app.listen(PORT, () => {
  console.log(`Server Listening on PORT: ${PORT}`);
});

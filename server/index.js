import express from "express";
import dbConnect from "./database/dbConnect.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

dbConnect();

app.listen(PORT, () => {
  console.log(`Server Listening on PORT: ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello Bitch");
});

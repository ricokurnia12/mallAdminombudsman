import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import api from "@src/api";

dotenv.config();
const app: express.Application | undefined = express();
const PORT: number = 5000;
app.use(express.json());
app.use(cookieParser());
app.use("/api/malladmin", api);

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

// import mongo url
const mongoURI: string | undefined = process.env.MONGO_URL;

if (!mongoURI) {
  console.error("MongoDB URI is not defined in the environment variables.");
  process.exit(1); // Exit the application if MongoDB URI is not defined.
}

// connect ke database
mongoose

  .connect(mongoURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

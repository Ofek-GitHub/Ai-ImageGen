import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./MongoDB/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log("Server listening https://aimage-l1za.onrender.com");
    });
  } catch (err) {
    console.log(err);
  }
};

startServer().then((r) => console.log("Server started!"));

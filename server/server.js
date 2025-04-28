import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import router from "./routes/routers.js";
import connectCloudinary from "./configs/cloudinary.js";

const app = express();
const port = process.env.PORT || 8000;

//DataBase Connection & CLOUDINARY
await connectDB();
await connectCloudinary();

//Allow Multiple Origins
const allowedOrigins = ["http://localhost:5173","https://greencart-bg-frontend.onrender.com","https://green-cart-bg-client.vercel.app"];

//Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//configuration the Routers
app.use("/api", router);

//API end Point for last
app.get("/", (req, res) => {
  res.send("API is Working");
});

app.listen(port, () => {
  console.log(`Server is Running on http://localhost:${port}`);
});

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log(err));

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // Pass the error to the next middleware
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

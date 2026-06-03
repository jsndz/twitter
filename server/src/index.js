import express from "express";
import { connect } from "./config/database.js";
import bodyParser from "body-parser";
import apiRoute from "./routes/index.js";
import passport from "passport";
import { passportAuth } from "./config/jwt.js";
import { PORT } from "./config/config.js";
import cors from "cors";
const app = express();
console.log("[LOG] Express app initialized");

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ["http://localhost:3000"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
console.log("[LOG] CORS configured");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log("[LOG] Body parser middleware configured");

app.use(passport.initialize());
passportAuth(passport);
console.log("[LOG] Passport authentication configured");

app.get("/health", async (req, res) => {
  console.log("[LOG] Health check endpoint called");
  res.send({ message: "true" });
});
app.use("/api", apiRoute);
console.log("[LOG] API routes configured");

app.listen(PORT, async () => {
  console.log(`[LOG] server started at port ${PORT}`);
  await connect();
  console.log("[LOG] MongoDB connected successfully");
  console.log("[LOG] Application is ready to accept requests");
});

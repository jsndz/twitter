import express from "express";
import { connect } from "./config/database.js";
import bodyParser from "body-parser";
import apiRoute from "./routes/index.js";
import passport from "passport";
import { passportAuth } from "./config/jwt.js";
import { PORT } from "./config/config.js";
import cors from "cors";
const app = express();
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
passportAuth(passport);

app.get("/health", async (req, res) => {
  res.send({ message: "true" });
});
app.use("/api", apiRoute);

app.listen(PORT, async () => {
  console.log(`server started at ${PORT}`);
  await connect();
  console.log("MongoDB connected");
});

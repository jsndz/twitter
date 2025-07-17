import express from "express";
import { connect } from "./config/database.js";
import bodyParser from "body-parser";
import apiRoute from "./routes/index.js";
import passport from "passport";
import { passportAuth } from "./config/jwt-middleware.js";
import { PORT } from "./config/config.js";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
passportAuth(passport);
app.get("/health", async (req, res) => {
  res.send({ message: "Ok" });
});
app.use("/api", apiRoute);

app.listen(PORT, async () => {
  console.log(`server started at ${PORT}`);
  await connect();
  console.log("MongoDB connected");
});

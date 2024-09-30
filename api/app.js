import express from "express";
import CookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import env from "dotenv";
import cors from "cors";

const app = express();
env.config();
app.use(cors({ origin: process.env.IncomingURL, credentials: true }));
app.use(express.json());
app.use(CookieParser());

app.use("/api/users", userRoute);
app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);

app.use("/api/test", (req, res) => {
  res.send("it works");
});

app.listen(8801, () => {
  console.log("server is running");
});

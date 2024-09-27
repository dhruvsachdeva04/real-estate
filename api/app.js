import express from "express";
import CookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(CookieParser());

app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);

app.use("/api/test", (req, res) => {
  res.send("it works");
});

app.listen(8801, () => {
  console.log("server is running");
});

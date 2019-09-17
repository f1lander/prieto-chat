import { ChatServer } from "./chat-server";
import { connect, Error } from "mongoose";
import { default as router } from "./router/index";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

require("dotenv").config();
let app = new ChatServer().app;

connect(
  process.env.MONGODB_URI_LOCAL,
  (err: Error) => {
    if (err) {
      throw err.message;
    } else {
      console.log(`Successfully connected to ${process.env.MONGODB_URI_LOCAL}`);
    }
  }
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use("/api", router);

export { app };

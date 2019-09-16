import { ChatServer } from "./chat-server";
import { connect, Error } from "mongoose";
import { default as router } from "./router/index";
import * as jwt from "express-jwt";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

import WithAuth from "../src/middelware";
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

// const options = {
//   secret: process.env.SECRET_KEY,
//   userProperty: "payload",
//   getToken: (req: any): any => {
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.split(" ")[0] === "Bearer"
//     ) {
//       return req.headers.authorization.split(" ")[1];
//     } else if (req.query && req.query.token) {
//       return req.query.token;
//     }
//     return undefined;
//   }
// };

// app.use(
//   jwt(options).unless({
//     path: [
//       "/api/users/authenticate",
//       "/api/users/register",
//     ]
//   })
// );
app.use("/api", router);

export { app };

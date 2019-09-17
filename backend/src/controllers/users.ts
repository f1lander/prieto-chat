import * as jwt from "jsonwebtoken";
import { default as User, IUser } from "../models/User";

import { Request, Response, NextFunction } from "express";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  console.log(email, password);

  const user: IUser = await User.findOne({ email }).exec();

  if (!user) {
    return res.status(401).json({
      error: "Incorrect email or password"
    });
  }
  try {
    const same = await user.isCorrectPassword(password);

    if (!same) {
      return res.status(401).json({
        error: "Incorrect email or password"
      });
    }
    // Issue token
    const payload = { email };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h"
    });
    res.cookie("token", token, { httpOnly: true }).sendStatus(200);
  } catch (error) {
    return res.status(500).json({
      error: "Internal error please try again"
    });
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, nickName } = req.body;
  const user = new User({ email, password, nickName });
  try {
    await user.save();

    res.status(200).send("Welcome to the club!");
  } catch (error) {
    res.status(500).send("Error registering new user please try again.");
  }
};

export { login, register };

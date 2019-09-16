import { Router } from "express";
import { register, login } from "../controllers/users";

const UserRouter = Router();

UserRouter.post("/register", register);
UserRouter.post("/authenticate", login);

export default UserRouter;

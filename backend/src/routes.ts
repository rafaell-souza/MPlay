import express from "express";
const router = express.Router();
import CreateUser from "./controller/createUser.ts";
import Login from "./controller/login.ts";

router.post("/register", new CreateUser().handle);
router.post("/login", new Login().handle);

export default router;
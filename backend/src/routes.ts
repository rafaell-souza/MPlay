import express from "express";
const router = express.Router();
import CreateUser from "./controller/createUser.ts";

router.post("/register", new CreateUser().handle);

export default router;
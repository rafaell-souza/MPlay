import express from "express";
const routes = express.Router({strict: true});

import { Create } from "./Controller/createUser.ts";

routes.post("/register", new Create().handler);

export default routes;
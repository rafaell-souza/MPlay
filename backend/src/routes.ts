import express from "express";
const routes = express.Router({strict: true});

import Create from "./Controller/createUser.ts";
import Login from "./Controller/loginUser.ts";

routes.post("/register", new Create().handler);
routes.post("/login", new Login().handle);

export default routes;
import express from "express";
const app = express();

import "express-async-errors";
import routes from "./routes.ts";
import cors from "cors";
import HandleError from "./Model/errors.ts/handler.ts";
import prisma from "../prisma/prisma.js";

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(HandleError);


prisma.$connect().then(() => {
    app.listen(8000, () => {console.log("Ready to work!");});
})
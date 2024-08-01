import "express-async-errors";
import Prisma from "../prisma/client.ts";
import HandleError from "./helpers/handler.ts";
import router from "./routes.ts";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(HandleError);

(async () => {
    Prisma.$connect().then(() => {
        app.listen(8000, () => {
            console.log("App is ready.");
        });
    }).catch((error) => {
        console.log("Failed to connect to database", error);
    });
})();
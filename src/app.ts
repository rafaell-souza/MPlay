import express from "express";
const app = express();
import { connection } from "./Model/database/connect.ts";



connection.authenticate()
    .then(() => {app.listen(8000, () => {
         console.log("Everything is working fine!");
            });
    })
    .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    }
);
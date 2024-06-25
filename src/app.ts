import express from "express";
const app = express();

import "express-async-errors";
import connection from "./Model/database/connect.ts";
import routes from "./routes.ts";
import cors from "cors";
import HandleError from "./Model/errors.ts/handler.ts";

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(HandleError);



connection.authenticate()
    .then(() => {app.listen(8000, () => {
         console.log("Everything is working fine!");
            });
    })
    .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    }
);
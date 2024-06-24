import { Sequelize } from "sequelize";

export const connection = new Sequelize({
    username: "postgres",
    password: "",
    database: "webflix",
    host: "localhost",
    dialect: "postgres",
    logging: false,
});
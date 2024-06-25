import { Sequelize } from "sequelize";

const connection = new Sequelize({
    username: "postgres",
    password: "",
    database: "webflix",
    host: "localhost",
    dialect: "postgres",
    logging: false
});

export default connection;
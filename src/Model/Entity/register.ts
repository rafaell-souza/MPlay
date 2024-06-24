import { Model, DataTypes } from "sequelize";
import { connection } from "../database/connect.ts";

export default class Registers extends Model {}
Registers.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(70),
        allowNull: false
    }
}, {
    sequelize: connection,
    modelName: "registers",
    timestamps: false
})
const { DataTypes } = require("sequelize")
const db = require("../db")

const Log = db.define("log", {
    description: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    definition: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    result: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    }
}
)

module.exports = Log;
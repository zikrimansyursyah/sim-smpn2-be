"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users_type extends Model {
    static associate(models) {
      users_type.hasMany(models.users);
    }
  }
  users_type.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users_type",
    }
  );
  return users_type;
};

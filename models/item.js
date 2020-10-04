const { DataTypes } = require("sequelize");

const itemModel = (sequelize) =>
  sequelize.define("Item", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = {
  itemModel,
};

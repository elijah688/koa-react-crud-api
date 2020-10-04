const { Sequelize } = require("sequelize");
const { itemModel } = require("./item");

const sequelize = new Sequelize({
  sync: { force: true },
  dialect: "sqlite",
  storage: "db.sqlite",
  logQueryParameters: true,
  benchmark: true,
});

const models = [itemModel];

const initModels = (models) => {
  for (const model of models) {
    console.log(model);
    model(sequelize);
  }
};
const initDb = async () => {
  try {
    initModels(models);
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = {
  initDb,
  sequelize,
};

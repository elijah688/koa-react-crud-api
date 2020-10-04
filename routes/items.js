const { sequelize } = require("../models");
const { validate } = require("./utils/validator");
const getItems = async (ctx, next) => {
  try {
    const items = await sequelize.models.Item.findAll();
    const transformedItems = items.map(({ id, title, content, src }) => ({
      id,
      title,
      content,
      src,
    }));
    ctx.response.status = 200;
    ctx.response.body = JSON.stringify({ items: transformedItems });
  } catch (error) {
    console.log(error);
    ctx.response.status = 500;
    ctx.response.body = JSON.stringify({ error: "Internal Server Error!" });
  }
  await next();
};

const getById = async (ctx, next) => {
  const responseBody = {};
  let statusCode = 200;
  try {
    const { id } = ctx.request.params;
    const item = await sequelize.models.Item.findByPk(id);
    if (item) {
      const transformedItem = {
        id: item.id,
        title: item.title,
        content: item.content,
        src: item.src,
      };
      console.log(transformedItem);
      responseBody.item = transformedItem;
    } else {
      statusCode = 404;
      responseBody.message = `Item With ID:${id} not found!`;
    }
  } catch (error) {
    responseBody.error = "Internal Server Error!";
    statusCode = 500;
  }
  ctx.response.status = statusCode;
  ctx.response.body = JSON.stringify(responseBody);
  await next();
};

const postItems = async (ctx, next) => {
  let statusCode = 201;
  const responseBody = {};
  let isValid = false;

  try {
    const { body } = ctx.request;
    isValid = validate(body);

    await sequelize.models.Item.create(body);
    responseBody.message = "Success!";
  } catch (error) {
    console.log(error);
    statusCode = isValid ? 500 : 422;
    responseBody.error = isValid ? "Internal Server Error!" : error;
  }
  ctx.response.status = statusCode;
  ctx.response.body = JSON.stringify(responseBody);
  await next();
};

const deleteItems = async (ctx, next) => {
  let responseBody = {};
  let statusCode = 200;
  try {
    const { id } = ctx.request.params;
    await sequelize.models.Item.destroy({ where: { id } });
    responseBody.message = "Item Successfully Deleted!";
  } catch (error) {
    console.lot(error);
    responseBody = "Internal Server Error";
    statusCode = 500;
  }
  ctx.response.status = statusCode;
  ctx.response.body = JSON.stringify(responseBody);
  await next();
};

const putItem = async (ctx, next) => {
  const responseBody = {};
  let statusCode = 200;
  let isValid = false;
  try {
    const { id } = ctx.request.params;
    const { body } = ctx.request;
    isValid = validate(body);

    const item = await sequelize.models.Item.findOne({ where: { id } });
    if (item) {
      await item.update(body);
    } else {
      await sequelize.models.Item.create(body);
      statusCode = 201;
    }
    responseBody.message = "Success!";
  } catch (error) {
    console.log(error);
    statusCode = isValid ? 500 : 422;
    responseBody.error = isValid ? "Internal Server Error!" : error;
  }
  ctx.response.body = JSON.stringify(responseBody);
  ctx.response.status = statusCode;
  await next();
};

module.exports = {
  get: getItems,
  getById,
  post: postItems,
  del: deleteItems,
  put: putItem,
};

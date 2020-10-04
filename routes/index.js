const KoaRouter = require("@koa/router");
const { post, get, del, put, getById } = require("./items");

const router = new KoaRouter();
const path = "/items";

router.post(path, post);
router.get(path, get);

router.put(`${path}/:id`, put);
router.get(`${path}/:id`, getById);
router.del(`${path}/:id`, del);

module.exports = {
  router,
};

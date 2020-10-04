const koa = require("koa");
const json = require("koa-json");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const { router } = require("./routes");
const { initDb } = require("./models");

const app = new koa();

initDb();

app.use(json());
app.use(cors());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log("listening on 3000..."));

const Ajv = require("ajv");
const schema = require("../schemas/item.validation.schema.json");

exports.validate = (body) => {
  const ajv = new Ajv({ allErrors: true });
  const isValid = ajv.compile(schema);
  const valid = isValid(body);

  if (valid) {
    return true;
  }
  throw isValid.errors;
};

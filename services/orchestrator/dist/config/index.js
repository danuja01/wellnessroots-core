var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var config_exports = {};
__export(config_exports, {
  default: () => config_default
});
module.exports = __toCommonJS(config_exports);
var import_celebrate = require("celebrate");
var import_module_logger = require("@sliit-foss/module-logger");
const logger = (0, import_module_logger.moduleLogger)("Config");
class Base {
  static get schema() {
    return {
      PORT: import_celebrate.Joi.number().optional(),
      AUTH_SERVICE_BASE_URL: import_celebrate.Joi.string().required(),
      USER_SERVICE_BASE_URL: import_celebrate.Joi.string().required(),
      EMAIL_SERVICE_BASE_URL: import_celebrate.Joi.string().required(),
      ORDER_SERVICE_BASE_URL: import_celebrate.Joi.string().required(),
      PAYMENT_SERVICE_BASE_URL: import_celebrate.Joi.string().required(),
      REVIEW_SERVICE_BASE_URL: import_celebrate.Joi.string().required(),
      NOTIFICATION_SERVICE_BASE_URL: import_celebrate.Joi.string().required(),
      DELIVERY_SERVICE_BASE_URL: import_celebrate.Joi.string().required(),
      SELLER_SERVICE_BASE_URL: import_celebrate.Joi.string().required()
    };
  }
  static get values() {
    return {
      PORT: process.env.PORT ?? 2002,
      AUTH_SERVICE_BASE_URL: process.env.AUTH_SERVICE_BASE_URL,
      USER_SERVICE_BASE_URL: process.env.USER_SERVICE_BASE_URL,
      EMAIL_SERVICE_BASE_URL: process.env.EMAIL_SERVICE_BASE_URL,
      ORDER_SERVICE_BASE_URL: process.env.ORDER_SERVICE_BASE_URL,
      PAYMENT_SERVICE_BASE_URL: process.env.PAYMENT_SERVICE_BASE_URL,
      REVIEW_SERVICE_BASE_URL: process.env.REVIEW_SERVICE_BASE_URL,
      NOTIFICATION_SERVICE_BASE_URL: process.env.NOTIFICATION_SERVICE_BASE_URL,
      DELIVERY_SERVICE_BASE_URL: process.env.DELIVERY_SERVICE_BASE_URL,
      SELLER_SERVICE_BASE_URL: process.env.SELLER_SERVICE_BASE_URL
    };
  }
}
__name(Base, "Base");
const config = Base.values;
const { error } = import_celebrate.Joi.object(Base.schema).validate(config);
if (error) {
  logger.error(
    `Environment validation failed. 
Details - ${error.details[0].message}
Exiting...`
  );
  process.exit(1);
}
var config_default = config;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=index.js.map
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var rateLimiter_exports = {};
__export(rateLimiter_exports, {
  defaultLimiter: () => defaultLimiter
});
module.exports = __toCommonJS(rateLimiter_exports);
var import_express_rate_limit = __toESM(require("express-rate-limit"));
var import_rate_limit_redis = __toESM(require("rate-limit-redis"));
var import_config = __toESM(require("../config"));
const options = {
  windowMs: 1 * 60 * 1e3,
  standardHeaders: true,
  legacyHeaders: false,
  max: 1e6,
  message: (_req, res) => res.status(429).json({
    message: `Too many requests`
  })
};
if (import_config.default.REDIS_CONNECTION_STRING) {
  const { redis } = require("@app/redis").default;
  options.store = new import_rate_limit_redis.default({
    sendCommand: (...args) => redis.call(...args)
  });
}
const defaultLimiter = (0, import_express_rate_limit.default)(options);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defaultLimiter
});
//# sourceMappingURL=rateLimiter.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var fs = require("fs-extra");
var ConfigService = /** @class */ (function () {
    function ConfigService(filePath) {
        this.envConfig = dotenv_1.parse(fs.readFileSync(filePath));
    }
    ConfigService.prototype.get = function (key) {
        return this.envConfig[key];
    };
    ConfigService.prototype.getPort = function (key) {
        return Number(this.envConfig[key]);
    };
    return ConfigService;
}());
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const fs = require("fs-extra");
class ConfigService {
    constructor(filePath) {
        this.envConfig = dotenv_1.parse(fs.readFileSync(filePath));
    }
    get(key) {
        return this.envConfig[key];
    }
    getPort(key) {
        return Number(this.envConfig[key]);
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map
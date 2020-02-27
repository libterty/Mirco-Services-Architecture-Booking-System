"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var books_controller_1 = require("./books.controller");
var books_service_1 = require("./books.service");
var typeorm_1 = require("@nestjs/typeorm");
var books_repository_1 = require("./books.repository");
var BooksModule = /** @class */ (function () {
    function BooksModule() {
    }
    BooksModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([books_repository_1.BookRepository])],
            controllers: [books_controller_1.BooksController],
            providers: [books_service_1.BooksService],
        })
    ], BooksModule);
    return BooksModule;
}());
exports.BooksModule = BooksModule;
//# sourceMappingURL=books.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var books_service_1 = require("./books.service");
var create_book_dto_1 = require("./dto/create-book.dto");
var BooksController = /** @class */ (function () {
    function BooksController(booksService) {
        this.booksService = booksService;
    }
    BooksController.prototype.getAllBooks = function (createBookDto) {
        return this.booksService.getBooks(createBookDto);
    };
    BooksController.prototype.getBookById = function (id) {
        return this.booksService.getBookById(id);
    };
    BooksController.prototype.createBook = function (createBookDto) {
        return this.booksService.createBook(createBookDto);
    };
    BooksController.prototype.updateBookById = function (id, createBookDto) {
        return this.booksService.updateBookById(id, createBookDto);
    };
    BooksController.prototype.deleteBookById = function (id) {
        return this.booksService.deleteBookById(id);
    };
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto]),
        __metadata("design:returntype", Promise)
    ], BooksController.prototype, "getAllBooks", null);
    __decorate([
        common_1.Get('/:id'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], BooksController.prototype, "getBookById", null);
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto]),
        __metadata("design:returntype", Promise)
    ], BooksController.prototype, "createBook", null);
    __decorate([
        common_1.Put('/:id'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)),
        __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, create_book_dto_1.CreateBookDto]),
        __metadata("design:returntype", Promise)
    ], BooksController.prototype, "updateBookById", null);
    __decorate([
        common_1.Delete('/:id'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], BooksController.prototype, "deleteBookById", null);
    BooksController = __decorate([
        common_1.Controller('books'),
        __metadata("design:paramtypes", [books_service_1.BooksService])
    ], BooksController);
    return BooksController;
}());
exports.BooksController = BooksController;
//# sourceMappingURL=books.controller.js.map
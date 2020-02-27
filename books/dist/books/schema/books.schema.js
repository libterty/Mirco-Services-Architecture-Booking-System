"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    numberPages: {
        type: Number,
        required: false,
    },
    publisher: {
        type: String,
        required: false,
    },
});
//# sourceMappingURL=books.schema.js.map
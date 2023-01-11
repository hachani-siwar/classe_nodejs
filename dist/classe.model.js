"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
let classeSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    classeGrade: { type: String, required: true }
});
classeSchema.plugin(mongoose_paginate_1.default);
const Classe = mongoose_1.default.model("Classe", classeSchema);
exports.default = Classe;

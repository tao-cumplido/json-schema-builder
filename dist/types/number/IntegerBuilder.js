"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../core/internal/index");
const NumberBuilder_1 = require("./NumberBuilder");
class IntegerBuilder extends NumberBuilder_1.default {
    constructor() {
        super();
        this[index_1.Serializable.data] = { type: 'integer' };
    }
}
exports.default = IntegerBuilder;
//# sourceMappingURL=IntegerBuilder.js.map
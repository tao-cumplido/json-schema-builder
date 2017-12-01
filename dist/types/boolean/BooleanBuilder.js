"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../../core/builder");
const internal_1 = require("../../core/internal");
class BooleanBuilder extends builder_1.SchemaBuilder {
    constructor() {
        super();
        this[internal_1.Serializable.data] = { type: 'boolean' };
    }
}
exports.default = BooleanBuilder;
//# sourceMappingURL=BooleanBuilder.js.map
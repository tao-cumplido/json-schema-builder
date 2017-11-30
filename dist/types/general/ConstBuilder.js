"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../../core/builder");
const internal_1 = require("../../core/internal");
class ConstBuilder extends builder_1.SchemaBuilder {
    constructor(value) {
        super();
        this[internal_1.Serializable.data] = { const: value };
    }
}
exports.default = ConstBuilder;
//# sourceMappingURL=ConstBuilder.js.map
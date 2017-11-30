"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../../core/builder");
const internal_1 = require("../../core/internal");
class EnumBuilder extends builder_1.SchemaBuilder {
    constructor(...items) {
        super();
        this[internal_1.Serializable.data] = { enum: items };
    }
}
exports.default = EnumBuilder;
//# sourceMappingURL=EnumBuilder.js.map
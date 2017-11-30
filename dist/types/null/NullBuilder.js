"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../../core/builder");
const internal_1 = require("../../core/internal");
class NullBuilder extends builder_1.SchemaBuilder {
    constructor() {
        super();
        this[internal_1.Serializable.data] = { type: 'null' };
    }
}
exports.default = NullBuilder;
//# sourceMappingURL=NullBuilder.js.map
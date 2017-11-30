"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../../core/builder");
const internal_1 = require("../../core/internal");
class NotBuilder extends builder_1.SchemaBuilder {
    constructor(schema) {
        super(function (options) {
            if (schema instanceof builder_1.SchemaBuilder) {
                schema[internal_1.Serializable.serializer](options);
                this[internal_1.Serializable.data].not = schema[internal_1.Serializable.data];
            }
            else {
                this[internal_1.Serializable.data].not = schema;
            }
        });
        this[internal_1.Serializable.data] = {};
    }
}
exports.default = NotBuilder;
//# sourceMappingURL=NotBuilder.js.map
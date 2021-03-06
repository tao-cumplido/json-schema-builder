"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../../core/builder");
const internal_1 = require("../../core/internal");
class OneBuilder extends builder_1.SchemaBuilder {
    constructor(...schemas) {
        super(function (options) {
            schemas.forEach((schema, i) => {
                if (schema instanceof builder_1.SchemaBuilder) {
                    schema[internal_1.Serializable.serializer](options);
                    schemas[i] = schema[internal_1.Serializable.data];
                }
            });
            this[internal_1.Serializable.data].oneOf = schemas;
        });
        this[internal_1.Serializable.data] = {};
    }
}
exports.default = OneBuilder;
//# sourceMappingURL=OneBuilder.js.map
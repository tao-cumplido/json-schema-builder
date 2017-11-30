"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const builder_1 = require("../../core/builder");
const internal_1 = require("../../core/internal");
class MergeBuilder extends builder_1.SchemaBuilder {
    constructor(...schemas) {
        super(function (options) {
            schemas.forEach((schema, i) => {
                if (schema instanceof builder_1.SchemaBuilder) {
                    schema[internal_1.Serializable.serializer](options);
                    schemas[i] = schema[internal_1.Serializable.data];
                }
            });
            lodash_1.mergeWith(this[internal_1.Serializable.data], ...schemas.map(lodash_1.cloneDeep), (targetValue, sourceValue) => {
                if (lodash_1.isArray(targetValue))
                    return targetValue.concat(sourceValue);
            });
        });
        this[internal_1.Serializable.data] = {};
    }
}
exports.default = MergeBuilder;
//# sourceMappingURL=MergeBuilder.js.map
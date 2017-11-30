"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const builder_1 = require("../../core/builder");
const internal_1 = require("../../core/internal");
const errors_1 = require("../../core/internal/errors");
const DataReference_1 = require("../../references/data/DataReference");
class ArrayBuilder extends builder_1.SchemaBuilder {
    constructor() {
        super(function (options) {
            Object.values(this[internal_1.Serializable.data]).filter((item) => item instanceof internal_1.Serializable).forEach((serializable) => {
                serializable[internal_1.Serializable.serializer](options);
            });
        });
        /* tslint:disable:member-ordering */
        // shortcuts
        this.max = this.maxItems;
        this.min = this.minItems;
        this.unique = this.uniqueItems;
        this[internal_1.Serializable.data] = { type: 'array' };
    }
    maxItems(value) {
        const valueError = new errors_1.ValueIntError('maxItems');
        const dataRefError = new errors_1.DataReferenceError();
        const data = this[internal_1.Serializable.data];
        data.maxItems = new internal_1.Serializable((options) => {
            const max = value instanceof DataReference_1.default ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.maxItems = max;
            }
        });
        return this;
    }
    minItems(value) {
        const valueError = new errors_1.ValueIntError('minItems');
        const dataRefError = new errors_1.DataReferenceError();
        const data = this[internal_1.Serializable.data];
        data.minItems = new internal_1.Serializable((options) => {
            const min = value instanceof DataReference_1.default ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.minItems = min;
            }
        });
        return this;
    }
    uniqueItems(value) {
        const dataRefError = new errors_1.DataReferenceError();
        const data = this[internal_1.Serializable.data];
        data.uniqueItems = new internal_1.Serializable((options) => {
            const unique = value instanceof DataReference_1.default ? dataRefError.validate(value, options) : value;
            switch (options.version) {
                default:
                    data.uniqueItems = unique;
            }
        });
        return this;
    }
    contains(value) {
        const versionError = new errors_1.VersionError(`The property "contains" is not available for this version of JSON Schema.`);
        const data = this[internal_1.Serializable.data];
        data.contains = new internal_1.Serializable((options) => {
            switch (options.version) {
                case __1.SchemaVersion.DRAFT_4:
                    options.errors.push(versionError);
                    data.contains = undefined;
                    break;
                default:
                    if (value instanceof builder_1.SchemaBuilder) {
                        value[internal_1.Serializable.serializer](options);
                        value = value[internal_1.Serializable.data];
                    }
                    data.contains = value;
            }
        });
        return this;
    }
}
exports.default = ArrayBuilder;
//# sourceMappingURL=ArrayBuilder.js.map
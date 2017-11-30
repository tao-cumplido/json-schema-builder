"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../../core/builder");
const internal_1 = require("../../core/internal");
const errors_1 = require("../../core/internal/errors");
const DataReference_1 = require("../../references/data/DataReference");
class StringBuilder extends builder_1.SchemaBuilder {
    constructor() {
        super(function (options) {
            Object.values(this[internal_1.Serializable.data]).filter((item) => item instanceof internal_1.Serializable).forEach((serializable) => {
                serializable[internal_1.Serializable.serializer](options);
            });
        });
        this[internal_1.Serializable.data] = { type: 'string' };
    }
    maxLength(value) {
        const valueError = new errors_1.ValueIntError('maxItems');
        const dataRefError = new errors_1.DataReferenceError();
        const data = this[internal_1.Serializable.data];
        data.maxLength = new internal_1.Serializable((options) => {
            const max = value instanceof DataReference_1.default ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.maxLength = max;
            }
        });
        return this;
    }
    minLength(value) {
        const valueError = new errors_1.ValueIntError('maxItems');
        const dataRefError = new errors_1.DataReferenceError();
        const data = this[internal_1.Serializable.data];
        data.minLength = new internal_1.Serializable((options) => {
            const max = value instanceof DataReference_1.default ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.minLength = max;
            }
        });
        return this;
    }
    pattern(value) {
        const dataRefError = new errors_1.DataReferenceError();
        const data = this[internal_1.Serializable.data];
        data.pattern = new internal_1.Serializable((options) => {
            const pattern = value instanceof DataReference_1.default ? dataRefError.validate(value, options) : value.source;
            switch (options.version) {
                default:
                    data.pattern = pattern;
            }
        });
        return this;
    }
}
exports.default = StringBuilder;
//# sourceMappingURL=StringBuilder.js.map
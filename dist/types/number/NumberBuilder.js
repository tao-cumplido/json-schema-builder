"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const builder_1 = require("../../core/builder");
const internal_1 = require("../../core/internal");
const errors_1 = require("../../core/internal/errors");
const DataReference_1 = require("../../references/data/DataReference");
class NumberBuilder extends builder_1.SchemaBuilder {
    constructor() {
        super(function (options) {
            Object.values(this[internal_1.Serializable.data]).filter((item) => item instanceof internal_1.Serializable).forEach((serializable) => {
                serializable[internal_1.Serializable.serializer](options);
            });
        });
        /* tslint:disable:member-ordering */
        // shortcuts
        this.max = this.maximum;
        this.min = this.minimum;
        this.xMax = this.exclusiveMaximum;
        this.xMin = this.exclusiveMinimum;
        this[internal_1.Serializable.data] = { type: 'number' };
    }
    multipleOf(value) {
        const valueError = new errors_1.ValueIntError('multipleOf');
        const dataRefError = new errors_1.DataReferenceError();
        const data = this[internal_1.Serializable.data];
        data.multipleOf = new internal_1.Serializable((options) => {
            const multiple = value instanceof DataReference_1.default ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.multipleOf = multiple;
            }
        });
        return this;
    }
    maximum(value) {
        const valueError = new errors_1.ValueIntError('maximum');
        const dataRefError = new errors_1.DataReferenceError();
        const data = this[internal_1.Serializable.data];
        data.maximum = new internal_1.Serializable((options) => {
            const max = value instanceof DataReference_1.default ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.maximum = max;
            }
        });
        return this;
    }
    exclusiveMaximum(value) {
        const valueError = new errors_1.ValueIntError('exclusiveMaximum');
        const dataRefError = new errors_1.DataReferenceError();
        const data = this[internal_1.Serializable.data];
        data.exclusiveMaximum = new internal_1.Serializable((options) => {
            const max = value instanceof DataReference_1.default ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                case __1.SchemaVersion.DRAFT_4:
                    data.maximum = max;
                    data.exclusiveMaximum = max === undefined ? max : true;
                    break;
                default:
                    data.exclusiveMaximum = max;
            }
        });
        return this;
    }
    minimum(value) {
        const valueError = new errors_1.ValueIntError('minimum');
        const dataRefError = new errors_1.DataReferenceError();
        const data = this[internal_1.Serializable.data];
        data.minimum = new internal_1.Serializable((options) => {
            const min = value instanceof DataReference_1.default ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.minimum = min;
            }
        });
        return this;
    }
    exclusiveMinimum(value) {
        const valueError = new errors_1.ValueIntError('exclusiveMinimum');
        const dataRefError = new errors_1.DataReferenceError();
        const data = this[internal_1.Serializable.data];
        data.exclusiveMinimum = new internal_1.Serializable((options) => {
            const min = value instanceof DataReference_1.default ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                case __1.SchemaVersion.DRAFT_4:
                    data.minimum = min;
                    data.exclusiveMinimum = min === undefined ? min : true;
                    break;
                default:
                    data.exclusiveMinimum = min;
            }
        });
        return this;
    }
}
exports.default = NumberBuilder;
//# sourceMappingURL=NumberBuilder.js.map
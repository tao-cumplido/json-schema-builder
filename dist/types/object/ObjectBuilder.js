"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const builder_1 = require("../../core/builder");
const internal_1 = require("../../core/internal");
const errors_1 = require("../../core/internal/errors");
const DataReference_1 = require("../../references/data/DataReference");
const propertyNames = Symbol('object-properties');
class ObjectBuilder extends builder_1.SchemaBuilder {
    constructor(properties) {
        super(function (options) {
            Object.values(this[internal_1.Serializable.data]).filter((item) => item instanceof internal_1.Serializable).forEach((serializable) => {
                serializable[internal_1.Serializable.serializer](options);
            });
        });
        /* tslint:disable:member-ordering */
        // shortcuts
        this.max = this.maxProperties;
        this.min = this.minProperties;
        this.require = Object.assign(this.required, this.requireHelper());
        this.patterns = this.patternProperties;
        this[internal_1.Serializable.data] = { type: 'object' };
        this[propertyNames] = properties || {};
        if (properties) {
            this.properties(properties);
        }
    }
    requireHelper() {
        const builder = this;
        return {
            all: () => builder.required(...Object.keys(builder[propertyNames])),
            but: (...properties) => {
                const filteredProperties = Object.keys(builder[propertyNames]).filter((x) => !properties.includes(x));
                return builder.required(...filteredProperties);
            }
        };
    }
    ;
    maxProperties(value) {
        const valueError = new errors_1.ValueIntError('maxProperties');
        const dataRefError = new errors_1.DataReferenceError();
        const data = this[internal_1.Serializable.data];
        data.maxProperties = new internal_1.Serializable((options) => {
            const max = value instanceof DataReference_1.default ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.maxProperties = max;
            }
        });
        return this;
    }
    minProperties(value) {
        const valueError = new errors_1.ValueIntError('minProperties');
        const dataRefError = new errors_1.DataReferenceError();
        const data = this[internal_1.Serializable.data];
        data.minProperties = new internal_1.Serializable((options) => {
            const min = value instanceof DataReference_1.default ? dataRefError.validate(value, options) : valueError.validate(value, options);
            switch (options.version) {
                default:
                    data.minProperties = min;
            }
        });
        return this;
    }
    required(first, ...rest) {
        const versionError = new errors_1.VersionError(`Empty required not allowed in draft 4!`);
        const dataRefError = new errors_1.DataReferenceError();
        const data = this[internal_1.Serializable.data];
        data.required = new internal_1.Serializable((options) => {
            switch (options.version) {
                case __1.SchemaVersion.DRAFT_4:
                    options.errors.push(versionError);
                    data.required = undefined;
                    break;
                default:
                    data.required = first instanceof DataReference_1.default ? dataRefError.validate(first, options) : first ? [first, ...rest] : [];
            }
        });
        return this;
    }
    ;
    properties(properties) {
        const data = this[internal_1.Serializable.data];
        data.properties = new internal_1.Serializable((options) => {
            switch (options.version) {
                default:
                    Object.keys(properties).forEach((name) => {
                        let property = properties[name];
                        if (property instanceof builder_1.SchemaBuilder) {
                            property[internal_1.Serializable.serializer](options);
                            properties[name] = property[internal_1.Serializable.data];
                        }
                    });
                    data.properties = properties;
            }
        });
        return this;
    }
    patternProperties(properties) {
        const data = this[internal_1.Serializable.data];
        data.patternProperties = new internal_1.Serializable((options) => {
            switch (options.version) {
                default:
                    const serialized = {};
                    Object.keys(properties).forEach((name) => {
                        let property = properties[name];
                        if (property instanceof builder_1.SchemaBuilder) {
                            property[internal_1.Serializable.serializer](options);
                            property = property[internal_1.Serializable.data];
                        }
                        Object.assign(serialized, {
                            [internal_1.regX(name)]: property
                        });
                    });
                    data.patternProperties = serialized;
            }
        });
        return this;
    }
    additionalProperties(value) {
        const data = this[internal_1.Serializable.data];
        data.additionalProperties = new internal_1.Serializable((options) => {
            switch (options.version) {
                default:
                    if (value instanceof internal_1.Serializable) {
                        value[internal_1.Serializable.serializer](options);
                        value = value[internal_1.Serializable.data];
                    }
                    data.additionalProperties = value;
            }
        });
        return this;
    }
    /*dependencies(dependencies: Dependencies): ObjectBuilder {
        const versionError = new VersionError(`Empty dependencies array not allowed in draft 4!`);
        // TODO
        return this;
    }*/
    propertyNames(value) {
        const versionError = new errors_1.VersionError(`propertyNames are not allowed in draft 4!`);
        const data = this[internal_1.Serializable.data];
        data.propertyNames = new internal_1.Serializable((options) => {
            switch (options.version) {
                case __1.SchemaVersion.DRAFT_4:
                    options.errors.push(versionError);
                    data.propertyNames = undefined;
                    break;
                default:
                    if (value instanceof internal_1.Serializable) {
                        value[internal_1.Serializable.serializer](options);
                        value = value[internal_1.Serializable.data];
                    }
                    data.propertyNames = value;
            }
        });
        return this;
    }
    restrict(value = true) {
        return this.additionalProperties(!value);
    }
}
exports.default = ObjectBuilder;
//# sourceMappingURL=ObjectBuilder.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const internal_1 = require("../internal");
const errors_1 = require("../internal/errors");
class SchemaBuilder extends internal_1.Serializable {
    constructor(serializer) {
        super(serializer);
    }
    // omit return type for subclasses to automatically infer own type, kinda like an implicit generic
    id(value) {
        const data = this[internal_1.Serializable.data];
        data.$id = new internal_1.Serializable((options) => {
            switch (options.version) {
                case __1.SchemaVersion.DRAFT_4:
                    data.$id = undefined;
                    data.id = value;
                    break;
                default:
                    data.$id = value;
            }
        });
        return this;
    }
    comment(value) {
        const versionError = new errors_1.VersionError(`The "$comment" keyword is supported in draft 7 or higher!`);
        const data = this[internal_1.Serializable.data];
        data.$comment = new internal_1.Serializable((options) => {
            switch (options.version) {
                case __1.SchemaVersion.DRAFT_4:
                case __1.SchemaVersion.DRAFT_6:
                    options.errors.push(versionError);
                    data.$comment = undefined;
                    break;
                default:
                    data.$comment = value;
            }
        });
        return this;
    }
    description(value) {
        const data = this[internal_1.Serializable.data];
        data.description = new internal_1.Serializable((options) => {
            switch (options.version) {
                default:
                    data.description = value;
            }
        });
        return this;
    }
    title(value) {
        const data = this[internal_1.Serializable.data];
        data.title = new internal_1.Serializable((options) => {
            switch (options.version) {
                default:
                    data.title = value;
            }
        });
        return this;
    }
    raw(value) {
        // TODO: warn if properties are overridden
        Object.assign(this[internal_1.Serializable.data], value);
    }
}
exports.SchemaBuilder = SchemaBuilder;
//# sourceMappingURL=index.js.map
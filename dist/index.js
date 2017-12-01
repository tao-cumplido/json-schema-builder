"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorStack = require("error-stack-parser");
const fs_extra_1 = require("fs-extra");
const builder_1 = require("./core/builder");
const internal_1 = require("./core/internal");
var SchemaVersion;
(function (SchemaVersion) {
    SchemaVersion["DRAFT_4"] = "http://json-schema.org/draft-04/schema#";
    SchemaVersion["DRAFT_6"] = "http://json-schema.org/draft-06/schema#";
    SchemaVersion["DRAFT_7"] = "http://json-schema.org/draft-07/schema#";
})(SchemaVersion = exports.SchemaVersion || (exports.SchemaVersion = {}));
class JsonSchema extends internal_1.Serializable {
    constructor(versionOrOptions, schema) {
        super(function () {
            if (schema instanceof builder_1.SchemaBuilder) {
                schema[internal_1.Serializable.serializer](this.options);
                Object.assign(this[internal_1.Serializable.data], schema[internal_1.Serializable.data]);
            }
            else {
                Object.assign(this[internal_1.Serializable.data], schema);
            }
        });
        this.errorMessages = [];
        this[internal_1.Serializable.data] = { $schema: versionOrOptions };
        if (typeof versionOrOptions === 'string') {
            this.options = {
                version: versionOrOptions,
                allowDataReference: false,
                errors: []
            };
        }
        else {
            this.options = Object.assign(versionOrOptions, { errors: [] });
        }
        this[internal_1.Serializable.serializer](this.options);
        this.options.errors.forEach((error) => {
            const stackFrame = ErrorStack.parse(error).find((frame) => frame.functionName === 'Object.<anonymous>');
            const name = Object.getPrototypeOf(error).constructor.name;
            const message = error.message;
            const file = stackFrame.fileName;
            const line = stackFrame.lineNumber;
            const column = stackFrame.columnNumber;
            this.errorMessages.push(`${name}: ${message}\n  at ${file}\n  line: ${line}, column: ${column}`);
        });
    }
    get errors() {
        return this.errorMessages;
    }
    write(path, options) {
        fs_extra_1.writeJsonSync(path, this[internal_1.Serializable.data], options || {
            spaces: 4
        });
    }
}
exports.JsonSchema = JsonSchema;
//# sourceMappingURL=index.js.map
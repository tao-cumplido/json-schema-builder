"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../../core/internal");
class DataReference extends internal_1.Serializable {
    constructor(pointer) {
        super(function (options) {
            if (DataReference.JSON_POINTER.RELATIVE.test(pointer) || DataReference.JSON_POINTER.ABSOLUTE.test(pointer)) {
                return;
            }
            options.errors.push(this.typeError);
            this[internal_1.Serializable.data] = undefined;
        });
        this[internal_1.Serializable.data] = {
            $data: pointer
        };
        this.typeError = new TypeError(`Not a valid JSON Pointer!`);
    }
}
// regex definitions from https://github.com/epoberezkin/ajv/blob/4d76c6fb813b136b6ec4fe74990bc97233d75dea/lib/compile/formats.js:19-20
DataReference.JSON_POINTER = Object.freeze({
    ABSOLUTE: /^(?:\/(?:[^~/]|~0|~1)*)*$|^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    RELATIVE: /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/
});
exports.default = DataReference;
//# sourceMappingURL=DataReference.js.map
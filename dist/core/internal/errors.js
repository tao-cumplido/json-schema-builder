"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class VersionError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.VersionError = VersionError;
class DataReferenceError extends Error {
    constructor() {
        super(`Usage of keyword "$data" is disabled.`);
    }
    validate(value, options) {
        if (options.allowDataReference) {
            value[index_1.Serializable.serializer](options);
            return value[index_1.Serializable.data];
        }
        options.errors.push(this);
        return undefined;
    }
}
exports.DataReferenceError = DataReferenceError;
class ValueError extends Error {
    constructor(keyword, type) {
        super(`The value of "${keyword}" MUST be ${type}.`);
    }
}
exports.ValueError = ValueError;
class ValueIntError extends ValueError {
    static test(value) {
        return Number.isInteger(value) && value >= 0;
    }
    constructor(keyword) {
        super(keyword, 'a non-negative integer');
    }
    validate(value, options) {
        if (Number.isInteger(value) && value >= 0) {
            return value;
        }
        options.errors.push(this);
        return undefined;
    }
}
exports.ValueIntError = ValueIntError;
//# sourceMappingURL=errors.js.map
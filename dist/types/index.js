"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ListBuilder_1 = require("./array/ListBuilder");
const TupleBuilder_1 = require("./array/TupleBuilder");
const ConstBuilder_1 = require("./general/ConstBuilder");
const EnumBuilder_1 = require("./general/EnumBuilder");
const NullBuilder_1 = require("./null/NullBuilder");
const IntegerBuilder_1 = require("./number/IntegerBuilder");
const NumberBuilder_1 = require("./number/NumberBuilder");
const ObjectBuilder_1 = require("./object/ObjectBuilder");
const StringBuilder_1 = require("./string/StringBuilder");
function sObject(properties) {
    return new ObjectBuilder_1.default(properties);
}
exports.sObject = sObject;
function sList(items) {
    return new ListBuilder_1.default(items);
}
exports.sList = sList;
exports.sArray = sList;
function sTuple(items) {
    return new TupleBuilder_1.default(items);
}
exports.sTuple = sTuple;
function sString() {
    return new StringBuilder_1.default();
}
exports.sString = sString;
function sNumber() {
    return new NumberBuilder_1.default();
}
exports.sNumber = sNumber;
function sInteger() {
    return new IntegerBuilder_1.default();
}
exports.sInteger = sInteger;
function sNull() {
    return new NullBuilder_1.default();
}
exports.sNull = sNull;
function sEnum(...items) {
    return new EnumBuilder_1.default(...items);
}
exports.sEnum = sEnum;
function sConst(value) {
    return new ConstBuilder_1.default(value);
}
exports.sConst = sConst;
//# sourceMappingURL=index.js.map
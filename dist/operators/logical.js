"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AllBuilder_1 = require("./allof/AllBuilder");
const AnyBuilder_1 = require("./anyof/AnyBuilder");
const MergeBuilder_1 = require("./merge/MergeBuilder");
const NotBuilder_1 = require("./not/NotBuilder");
const OneBuilder_1 = require("./oneof/OneBuilder");
function sAnd(...schemas) {
    return new AllBuilder_1.default(...schemas);
}
exports.sAnd = sAnd;
function sOr(...schemas) {
    return new AnyBuilder_1.default(...schemas);
}
exports.sOr = sOr;
function sUnion(...schemas) {
    return new MergeBuilder_1.default(...schemas);
}
exports.sUnion = sUnion;
function sNot(schema) {
    return new NotBuilder_1.default(schema);
}
exports.sNot = sNot;
function sXor(...schemas) {
    return new OneBuilder_1.default(...schemas);
}
exports.sXor = sXor;
//# sourceMappingURL=logical.js.map
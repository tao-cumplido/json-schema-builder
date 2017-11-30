"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AllBuilder_1 = require("./allof/AllBuilder");
const AnyBuilder_1 = require("./anyof/AnyBuilder");
const MergeBuilder_1 = require("./merge/MergeBuilder");
const NotBuilder_1 = require("./not/NotBuilder");
const OneBuilder_1 = require("./oneof/OneBuilder");
function sAllOf(...schemas) {
    return new AllBuilder_1.default(...schemas);
}
exports.sAllOf = sAllOf;
function sAnyOf(...schemas) {
    return new AnyBuilder_1.default(...schemas);
}
exports.sAnyOf = sAnyOf;
function sMerge(...schemas) {
    return new MergeBuilder_1.default(...schemas);
}
exports.sMerge = sMerge;
function sNot(schema) {
    return new NotBuilder_1.default(schema);
}
exports.sNot = sNot;
function sOneOf(...schemas) {
    return new OneBuilder_1.default(...schemas);
}
exports.sOneOf = sOneOf;
//# sourceMappingURL=schematical.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const source_map_support_1 = require("source-map-support");
const re = require("regex-regex");
source_map_support_1.install();
function regX(regex) {
    return new RegExp(re.test(regex) ? regex.slice(1, regex.lastIndexOf('/')) : regex).source;
}
exports.regX = regX;
class Serializable {
    constructor(serializer) {
        this.isSerialized = false;
        this[Serializable.serializer] = function (options) {
            if (this.isSerialized)
                return;
            serializer && serializer(options);
            this.isSerialized = true;
        };
    }
}
Serializable.serializer = Symbol();
Serializable.data = Symbol();
exports.Serializable = Serializable;
//# sourceMappingURL=index.js.map
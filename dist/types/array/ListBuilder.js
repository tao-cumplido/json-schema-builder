"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../../core/builder");
const internal_1 = require("../../core/internal");
const ArrayBuilder_1 = require("./ArrayBuilder");
class ListBuilder extends ArrayBuilder_1.default {
    constructor(items) {
        super();
        if (items) {
            this.items(items);
        }
    }
    items(items) {
        const data = this[internal_1.Serializable.data];
        data.items = new internal_1.Serializable((options) => {
            switch (options.version) {
                default:
                    if (items instanceof builder_1.SchemaBuilder) {
                        items[internal_1.Serializable.serializer](options);
                        items = items[internal_1.Serializable.data];
                    }
                    data.items = items;
            }
        });
        return this;
    }
}
exports.default = ListBuilder;
//# sourceMappingURL=ListBuilder.js.map
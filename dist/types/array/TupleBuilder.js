"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../../core/builder");
const internal_1 = require("../../core/internal");
const ArrayBuilder_1 = require("./ArrayBuilder");
class TupleBuilder extends ArrayBuilder_1.default {
    constructor(items) {
        super();
        if (items.length) {
            this.items(items);
        }
    }
    items(items) {
        const data = this[internal_1.Serializable.data];
        data.items = new internal_1.Serializable((options) => {
            switch (options.version) {
                default:
                    items.forEach((item, index) => {
                        if (item instanceof builder_1.SchemaBuilder) {
                            item[internal_1.Serializable.serializer](options);
                            items[index] = item[internal_1.Serializable.data];
                        }
                    });
                    data.items = items;
            }
        });
        return this;
    }
    additionalItems(value) {
        const data = this[internal_1.Serializable.data];
        data.additionalItems = new internal_1.Serializable((options) => {
            switch (options.version) {
                default:
                    if (value instanceof builder_1.SchemaBuilder) {
                        value[internal_1.Serializable.serializer](options);
                        value = value[internal_1.Serializable.data];
                    }
                    data.additionalItems = value;
            }
        });
        return this;
    }
}
exports.default = TupleBuilder;
//# sourceMappingURL=TupleBuilder.js.map
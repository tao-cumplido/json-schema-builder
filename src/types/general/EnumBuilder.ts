import { JsonValue, SchemaBuilder } from '../../core/builder';
import { Serializable } from '../../core/internal';

export default class EnumBuilder extends SchemaBuilder {
    constructor(...items: Array<JsonValue>) {
        super();
        this[Serializable.data] = { enum: items };
    }
}

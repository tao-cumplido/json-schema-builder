import { JsonValue, SchemaBuilder } from '../../core/builder';
import { Serializable } from '../../core/internal';

export default class ConstBuilder extends SchemaBuilder {
    constructor(value: JsonValue) {
        super();
        this[Serializable.data] = { const: value };
    }
}

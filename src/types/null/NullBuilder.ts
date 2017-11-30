import { SchemaBuilder } from '../../core/builder';
import { Serializable } from '../../core/internal';

export default class NullBuilder extends SchemaBuilder {
    constructor() {
        super();
        this[Serializable.data] = { type: 'null' }
    }
}

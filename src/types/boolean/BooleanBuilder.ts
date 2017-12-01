import { SchemaBuilder } from '../../core/builder';
import { Serializable } from '../../core/internal';

export default class BooleanBuilder extends SchemaBuilder {
    constructor() {
        super();
        this[Serializable.data] = { type: 'boolean' };
    }
}

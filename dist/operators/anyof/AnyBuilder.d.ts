import { SchemaBuilder } from '../../core/builder';
import { Schema } from '../../core/builder/schema';
export default class AnyBuilder extends SchemaBuilder {
    constructor(...schemas: Array<Schema | SchemaBuilder>);
}

import { SchemaTree } from '../../core/builder/schema';
import { ReferenceData } from '../../references/data/schema';

export interface SchemaString extends SchemaTree {
    type: 'string',
    maxLength: number | ReferenceData,
    minLength: number | ReferenceData,
    pattern: string | ReferenceData,
}

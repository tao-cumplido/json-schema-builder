import { SchemaVersion } from '../..';

export interface SchemaTree {
    $id?: string,
    $comment?: string,
    description?: string,
    title?: string,
    // draft 4 compatibility
    id?: string,
}

export interface SchemaRoot extends SchemaTree {
    $schema: SchemaVersion
}

export type Schema = SchemaTree | boolean;

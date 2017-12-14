import { install } from 'source-map-support';
import { BuilderOptions } from '../..';
import { SchemaTree } from '../builder/schema';

import * as re from 'regex-regex';

install();

export function regX(regex: string): string {
    return new RegExp(re.test(regex) ? regex.slice(1, regex.lastIndexOf('/')) : regex).source
}

export interface SerializerOptions extends BuilderOptions {
    errors: Array<Error>
}

export type Serializer = (options: SerializerOptions) => void

export type SerializableTree<T extends SchemaTree> = {
    [P in keyof T]: T[P] | Serializable
}

export class Serializable {
    static readonly serializer = Symbol('serializer');
    static readonly data = Symbol('data');

    private isSerialized: boolean;

    constructor(serializer?: Serializer) {
        this.isSerialized = false;
        this[Serializable.serializer] = function (options: SerializerOptions) {
            if (this.isSerialized) return;
            serializer && serializer.call(this, options);
            this.isSerialized = true;
        }
    }
}

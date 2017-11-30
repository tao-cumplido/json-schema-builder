import { Serializable } from '../../core/internal';

export default class DataReference extends Serializable {
    // regex definitions from https://github.com/epoberezkin/ajv/blob/4d76c6fb813b136b6ec4fe74990bc97233d75dea/lib/compile/formats.js:19-20
    private static readonly JSON_POINTER = Object.freeze({
        ABSOLUTE: /^(?:\/(?:[^~/]|~0|~1)*)*$|^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
        RELATIVE: /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/
    });

    private typeError: TypeError;

    constructor(pointer: string) {
        super(function (this: DataReference, options) {
            if (DataReference.JSON_POINTER.RELATIVE.test(pointer) || DataReference.JSON_POINTER.ABSOLUTE.test(pointer)) {
                return;
            }

            options.errors.push(this.typeError);
            this[Serializable.data] = undefined;
        });

        this[Serializable.data] = {
            $data: pointer
        };

        this.typeError = new TypeError(`Not a valid JSON Pointer!`);
    }
}

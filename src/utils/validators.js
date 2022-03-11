import { toNumber } from './helpers.js';

export const required = value => {
    if (typeof value === 'undefined' || value === null) {
        return false;
    } else if (typeof value === 'boolean') {
        return value;
    } else if (value instanceof Date) {
        return !isNaN(value.getTime());
    } else if (Array.isArray(value)) {
        return Boolean(value.length);
    } else if (typeof value === 'object') {
        return Boolean(Object.keys(value).length);
    }

    return Boolean(String(value).trim().length);
};

export const isValueConvertedToNumber = value => !isNaN(toNumber(value));

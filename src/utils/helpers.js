import { required } from './validators.js';

export const getRandomId = () => Math.random()
    .toString()
    .slice(2, 10);

export const toNumber = value => parseFloat(value);

export const isArrayContainsValue = (array, strict = false) => value => {
    let result = array.includes(value);

    if (!strict) result = !required(value) || result;

    return result;
};

export const toRawType = value => Object.prototype.toString
    .call(value)
    .slice(8, -1);

export const getAllParents = node => {
    let el = node.parentElement;
    const parents = [];

    while (el) {
        parents.push(el);
        el = el.parentElement;
    }

    return parents;
};

export const wait = delay => new Promise(resolve => {
    setTimeout(resolve, delay);
});

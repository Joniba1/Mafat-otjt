import { array } from '../domain/array';

 interface ArrayRepo {
    get: () => number[];
    pop: () => void;
    push: (num: number) => void;
    replace: (index: number, value: number) => void;
    delete: (index: number) => void;
}

export const arrayRepo: ArrayRepo = {
    get: () => array,
    pop: () => array.pop(),
    push: (num: number) => array.push(num),
    replace: (index: number, value: number) => { array[array.indexOf(index)] = value }, // replaces index with a given number
    delete: (index: number) => { array[array.indexOf(index)] = 0 } //replaces index with 0
}


export default ArrayRepo; 
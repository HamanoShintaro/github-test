export const enum Language {
    ENGLISH = 'ENGLISH',
    JAPANESE = 'JAPANESE'
}

export interface IIngredients {
    id?: number;
    year?: number;
    month?: number;
    date?: number;
    name?: string;
    cuisine?: string;
    images?: string;
    description?: string;
    language?: Language;
}

export class Ingredients implements IIngredients {
    constructor(
        public id?: number,
        public year?: number,
        public month?: number,
        public date?: number,
        public name?: string,
        public cuisine?: string,
        public images?: string,
        public description?: string,
        public language?: Language
    ) {}
}

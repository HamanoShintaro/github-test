import { Moment } from 'moment';
import { IAuthor } from 'app/shared/model/author.model';

export const enum Language {
    ENGLISH = 'ENGLISH',
    JAPANESE = 'JAPANESE'
}

export interface IBook {
    id?: number;
    isbn?: string;
    title?: string;
    price?: number;
    language?: Language;
    publishDate?: Moment;
    author?: IAuthor;
}

export class Book implements IBook {
    constructor(
        public id?: number,
        public isbn?: string,
        public title?: string,
        public price?: number,
        public language?: Language,
        public publishDate?: Moment,
        public author?: IAuthor
    ) {}
}

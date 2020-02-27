import { BaseEntity } from 'typeorm';
export declare class Book extends BaseEntity {
    id: number;
    title: string;
    author: string;
    numberPages: number;
    publisher: string;
}

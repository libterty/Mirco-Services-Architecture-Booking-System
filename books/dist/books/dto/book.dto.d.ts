import { Document } from 'mongoose';
export declare class Book extends Document {
    readonly title: string;
    readonly author: string;
    readonly numberPages: number;
    readonly publisher: string;
}

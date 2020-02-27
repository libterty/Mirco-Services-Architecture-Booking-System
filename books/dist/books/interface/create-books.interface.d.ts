import { Document } from 'mongoose';
export interface CreateBooks extends Document {
    readonly title: string;
    readonly author: string;
    readonly numberPages: number;
    readonly publisher: string;
}

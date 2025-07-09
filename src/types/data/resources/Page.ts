import { PageType } from './PageType';

export type Page = {
    id : number;
    isPublished: boolean;
    name: string;
    permalink: string;
    type: PageType
}
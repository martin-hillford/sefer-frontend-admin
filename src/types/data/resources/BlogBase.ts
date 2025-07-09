export type BlogBase = {
    authorId: number;
    creationDate: Date;
    id: number;
    isPublished: boolean;
    modificationDate?: Date | null;
    name : string;
    permalink: string;
    publicationDate?: Date | null;
    isHtmlContent : boolean;
}
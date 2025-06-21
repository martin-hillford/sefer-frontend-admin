import { BlogBase } from './BlogBase';

export type BlogWithContent = BlogBase & {
    authorName: string;
    content: string;
}


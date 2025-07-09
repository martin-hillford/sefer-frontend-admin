import { UserBase } from '../users/UserBase';
import { BlogBase } from './BlogBase';

export type Blog = BlogBase & {
    author: UserBase;
}
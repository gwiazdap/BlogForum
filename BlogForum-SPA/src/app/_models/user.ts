import { Post } from './post';

export interface User {
    id: number;
    username: string;
    createdAt: Date;
    lastActive: Date;
    posts: Post[];
}

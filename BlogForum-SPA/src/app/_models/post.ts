export interface Post {
    id: number;
    dateAdded: Date;
    title: string;
    content: string;
    userId: number;
    username: string;
    comments: Comment[];
}

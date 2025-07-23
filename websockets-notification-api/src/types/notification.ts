export type Notification = {
    id: string;
    author: {
        name: string;
        avatar_url?: string;
    };
    message: string;
    created_at: string;
    read: boolean;
};

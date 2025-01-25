import {SerializedError} from "@reduxjs/toolkit";

export interface Post {
    id: string;
    username: string;
    shopId: string;
    shopName: string;
    avatar: string;
    images: string[];
    comments: number;
    didLike: boolean;
    likes: number;
    premium: boolean;
    text: string;
    date: string;
    impressionSent?: boolean;
}

export interface PostsState {
    posts: Post[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    loadedCount: number;
    hasMore: boolean;
}

export interface FetchPostsErrorResponse {
    error: SerializedError;
}

export interface FetchPostsResponse {
    hasMore: boolean;
    data: Post[];
}

export interface MenuItem {
    title: string;
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    link: string;
    isSelected?: boolean;
}
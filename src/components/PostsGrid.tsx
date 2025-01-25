import {FC, useEffect, useRef} from 'react';
import {PostCard} from "./PostCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../app/postsReducer";
import LoadingBar from "./LoadingBar";
import {AppDispatch} from "../app/store.tsx";
import './PostGrid.css';
import {Post, PostsState} from "../types/common.tsx";

const PostsGrid:FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {posts, loadedCount} = useSelector((state:{posts: PostsState}) => state.posts);
    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            dispatch(fetchPosts(loadedCount) as never);
            isFirstRun.current = false;
        }
    }, [loadedCount, dispatch, posts]);

    return (
        <div id="feed-container">
            {posts.map((post:Post, key:number) => (<PostCard key={key} {...post}/>))}
            <LoadingBar/>
        </div>
    )
}

export default PostsGrid

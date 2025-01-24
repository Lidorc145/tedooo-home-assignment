import {useEffect, useRef} from 'react';
import {PostCard} from "./PostCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../../app/postsReducer";
import LoadingBar from "./LoadingBar";
import './PostGrid.css';

function PostsGrid() {
    const dispatch = useDispatch();
    const {posts, loadedCount} = useSelector((state) => state.posts);
    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            dispatch(fetchPosts(loadedCount));
            isFirstRun.current = false;
        }
    }, [loadedCount, dispatch, posts]);

    return (
        <div id="feed-container">
            {posts.map((post, key) => (<PostCard {...post} key={key}/>))}
            <LoadingBar/>
        </div>
    )
}

export default PostsGrid

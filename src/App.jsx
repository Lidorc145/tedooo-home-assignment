import {useEffect, useRef, useState} from 'react';
import './App.css';
import {Header} from "./components/Header.jsx";
import {PostCard} from "./components/PostCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../app/postsReducer";

function App() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const loadedCount = useSelector((state) => state.posts.loadedCount);
    const hasMore = useSelector((state) => state.posts.hasMore);
    const status = useSelector((state) => state.posts.status);
    const isFirstRun = useRef(true);
    const LoadingBar = () => {
        let text;
        if(status==='loading'){
            text = 'Hang tight, we\'re loading more – just a moment!';
        }else{
            text='Don\'t stop here, there\'s plenty more to see – scroll down!';
        }

        return (
            <>
                {hasMore && (<div className="post-card max-w-[1024px] mt-4 mx-auto card mb-96">
                    <div className="feed-conetnt loader-text">
                        {text}
                    </div>
                </div>)}
            </>
        );
    };
    useEffect(() => {
        if (isFirstRun.current) {
            dispatch(fetchPosts(loadedCount));
            isFirstRun.current = false;

        }
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            if (scrollPosition >= documentHeight) {
                if(hasMore) {
                    dispatch(fetchPosts(loadedCount));
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loadedCount, dispatch, posts]);


    return (
        <>
            <Header/>
            <div className="mt-4 mb-20">
                <div id="feed-container">
                    {posts.map((post, key) => (<PostCard {...post} key={key}/>))}
                    <LoadingBar/>
                </div>
            </div>
        </>
    )


}

export default App

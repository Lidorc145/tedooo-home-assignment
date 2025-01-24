import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../../app/postsReducer";

function LoadingBar() {
    const dispatch = useDispatch();
    const {posts, loadedCount, hasMore, status} = useSelector((state) => state.posts);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            if (scrollPosition >= documentHeight && hasMore && status !== 'loading') {
                dispatch(fetchPosts(loadedCount));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loadedCount, dispatch, posts, status]);


    const text = (status === 'loading') ? 'Hang tight, we\'re loading more – just a moment!' : 'Don\'t stop here, there\'s plenty more to see – scroll down!';
    const loadingBar = hasMore && (<div className="post-card max-w-[1024px] mt-4 mx-auto card mb-44">
        <div className="feed-conetnt loader-text">
            {text}
        </div>
    </div>);
    return (
        <>
            {loadingBar}
        </>
    );
}

export default LoadingBar
import FbImageLibrary from "react-fb-image-grid";
import GreenLikeIcon from "../assets/icon_greenlike.svg?react";
import {format, formatDistance} from "date-fns";
import {impression, toggleLike} from "../../app/postsReducer.js";
import {useDispatch} from "react-redux";
import {motion} from "motion/react"
import IconEye from '../assets/icon_eye.svg?react';
import IconCommentButton from '../assets/icon_comment_button.svg?react';
import IconLikeButton from '../assets/icon_like_button.svg?react';

export const PostCard = (item, key) => {
    const dispatch = useDispatch();
    return (
        <motion.div key={key} initial={{opacity: 0, y: 100}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1, delay: 0.5, ease: 'easeOut',}}>
            <div className="post-card max-w-[1024px] mt-4 mx-auto card"
                 onMouseOver={() => dispatch(impression({id: item.id}))}>
                <div className="feed-conetnt">
                    <PostHeader item={item}/>
                    <div className="feed-text-content">
                        {item.text}
                    </div>
                </div>
                <div>
                    <FbImageLibrary images={item.images} hideOverlay={true} onClickEach={() => {
                    }}/>
                </div>
                <div className="post-interactions flex justify-between m-4">
                    <div className="likes flex">
                        <GreenLikeIcon className={'mr-3'}/>{item.likes} Likes
                    </div>
                    <div className="comments">{item.comments} Comments</div>
                </div>
                <div className="spacer"></div>
                <div className="controllers">
                    <LikeButton item={item}/>
                    <CommentButton/>
                </div>
            </div>
        </motion.div>
    );
}

const PostHeader = ({item}) => <div className={'flex relative'}>
    {item.premium && <ProTag/>}
    <img className="user-image" src={item.avatar} alt="user avatar"/>
    <div className={'flex flex-col'}>
        <p className={'username'}>{item.username} </p>
        <div className="flex flex-row">
            <p className={'shopName'}>{item.shopName}</p>
            <p className={item.shopName ? 'dot' : 'hidden'}>·</p>
            <p className={'date'}>{formatTime(item.date)}</p>
            <p className={(item.impressionSent || localStorage.getItem(`impression_sent_${item.id}`)) ? 'dot' : 'hidden'}>·</p>
            <div className="post-seen">{(item.impressionSent || localStorage.getItem(`impression_sent_${item.id}`)) && (
                <IconEye className={'opacity-50'}/>)}</div>
        </div>
    </div>
</div>;

const CommentButton = () => <div className="comment-button flex justify-center items-center content-center">
    <IconCommentButton className='mr-2'/>Comment</div>;

const ProTag = () => (
    <div className="premium-tag-container medium">
        <div className="image-wrapper icon">
            <img alt=""
                 src="data:image/png;base64,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"/>
        </div>
        <span className="text">Pro</span>
    </div>
);

const LikeButton = ({item}) => {
    const dispatch = useDispatch();
    const onLikeClicked = () => dispatch(toggleLike({id: item.id}));
    return (
        <div onClick={onLikeClicked}
             className={"like-button flex justify-center items-center content-center " + (item.didLike && 'didLike')}>
            <IconLikeButton className="mr-2"/>
            Like
        </div>
    )
};


function formatTime(date) {
    const now = new Date();
    const difference = formatDistance(new Date(date), now, {addSuffix: true});

    if (new Date() - new Date(date) > 365 * 24 * 60 * 60 * 1000) {
        return format(new Date(date), 'dd/MM/yyyy');
    }

    return difference;
}
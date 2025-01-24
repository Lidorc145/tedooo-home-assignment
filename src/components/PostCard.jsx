import FbImageLibrary from "react-fb-image-grid";
import GreenLikeIcon from "../assets/icon_greenlike.svg";
import {format, formatDistance} from "date-fns";
import {impression, toggleLike} from "../../app/postsReducer.js";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import { motion } from "motion/react"
import IconEye from '../assets/icon_eye.svg';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const PostCard = (item, key) => {
    const dispatch = useDispatch();
    return (
        <motion.div initial={{opacity: 0, y: 100}}
                    animate={{opacity: 1, y: 0}}
                    transition={{
                        duration: 1,
                        delay: 0.5,
                        ease: 'easeOut',
                    }}>
            <div className="post-card max-w-[1024px] mt-4 mx-auto card" onMouseOver={() => dispatch(impression({id: item.id}))}>
                <div className="feed-conetnt">

                    <div className={'flex relative'}>
                        {item.premium && <ProTag/>}
                        <img className="user-image" src={item.avatar} alt="user avatar"/>
                        <div className={'flex flex-col'}>
                            <p className={'username'}>{item.username} </p>
                            <div className="flex flex-row">
                                <p className={'shopName'}>{item.shopName}</p>
                                <p className={item.shopName ? 'dot' : 'hidden'}>·</p>
                                <p className={'date'}>{formatTime(item.date)}</p>
                                <p className={item.impressionSent ? 'dot' : 'hidden'}>·</p>
                                <div className="post-seen">{item.impressionSent && (<img src={IconEye}/>)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="feed-text-content">
                        {item.text}
                    </div>
                </div>
                <div>
                    <FbImageLibrary images={item.images} hideOverlay={true} onClickEach={() => {
                    }}/>
                </div>
                <div className="post-interactions flex justify-between m-4">
                    <div className="likes flex"><img className={'mr-3'} src={GreenLikeIcon}
                                                     alt={"likes icon"}/>{item.likes} Likes
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

const CommentButton = () => <div className="comment-button flex justify-center items-center content-center">
    <svg className="mr-2"
         width="18"
         height="24"
         viewBox="0 0 18 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.75 5.8125C3.50136 5.8125 3.2629 5.91127 3.08709 6.08709C2.91127 6.2629 2.8125 6.50136 2.8125 6.75V17.392L4.85225 15.3523C4.95774 15.2468 5.10082 15.1875 5.25 15.1875H14.25C14.4986 15.1875 14.7371 15.0887 14.9129 14.9129C15.0887 14.7371 15.1875 14.4986 15.1875 14.25V6.75C15.1875 6.50136 15.0887 6.2629 14.9129 6.08709C14.7371 5.91127 14.4986 5.8125 14.25 5.8125H3.75ZM2.29159 5.29159C2.67839 4.9048 3.20299 4.6875 3.75 4.6875H14.25C14.797 4.6875 15.3216 4.9048 15.7084 5.29159C16.0952 5.67839 16.3125 6.20299 16.3125 6.75V14.25C16.3125 14.797 16.0952 15.3216 15.7084 15.7084C15.3216 16.0952 14.797 16.3125 14.25 16.3125H5.48299L2.64775 19.1477C2.48687 19.3086 2.24493 19.3567 2.03474 19.2697C1.82455 19.1826 1.6875 18.9775 1.6875 18.75V6.75C1.6875 6.20299 1.9048 5.67839 2.29159 5.29159Z"
            fill="currentColor"
        />
    </svg>
    Comment</div>;

const ProTag = ()=>(
    <div className="premium-tag-container medium">
        <div className="image-wrapper icon">
            <img alt="" src="data:image/png;base64,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" />
        </div>
        <span className="text">Pro</span>
    </div>
);

const LikeButton = ({item}) => {
    const dispatch = useDispatch();
    const onLikeClicked = ()=>dispatch(toggleLike({id: item.id}));
    return (
        <div onClick={onLikeClicked} className={"like-button flex justify-center items-center content-center "+(item.didLike && 'didLike')}>
            <svg className="mr-2" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M7.73598 1.27155C7.82626 1.06841 8.02771 0.9375 8.25 0.9375C8.99592 0.9375 9.71129 1.23382 10.2387 1.76126C10.7662 2.28871 11.0625 3.00408 11.0625 3.75V6.1875H14.7421C15.0399 6.18462 15.3348 6.24628 15.6065 6.36823C15.8793 6.49065 16.1222 6.67092 16.3184 6.89654C16.5145 7.12215 16.6593 7.38773 16.7427 7.67486C16.8261 7.96199 16.846 8.26381 16.8011 8.55941L15.7661 15.3093V15.3093C15.6915 15.8011 15.4417 16.2495 15.0627 16.5716C14.6846 16.893 14.2033 17.0673 13.7071 17.0625H3C2.45299 17.0625 1.92839 16.8452 1.54159 16.4584C1.1548 16.0716 0.9375 15.547 0.9375 15V9.75C0.9375 9.20299 1.1548 8.67839 1.54159 8.29159C1.92839 7.9048 2.45299 7.6875 3 7.6875H4.88445L7.73598 1.27155ZM5.8125 8.36937L8.59931 2.09904C8.91658 2.16618 9.21043 2.32394 9.44324 2.55676C9.75971 2.87323 9.9375 3.30245 9.9375 3.75V6.75C9.9375 7.06066 10.1893 7.3125 10.5 7.3125H14.745L14.7514 7.31246C14.8873 7.31093 15.0219 7.33895 15.1459 7.3946C15.2698 7.45024 15.3803 7.53218 15.4694 7.63474C15.5586 7.73729 15.6244 7.85801 15.6623 7.98852C15.7002 8.11895 15.7093 8.25605 15.6889 8.39033V8.39033L14.6539 15.1407C14.62 15.3642 14.5064 15.568 14.3341 15.7144C14.1618 15.8609 13.9425 15.9401 13.7164 15.9375L5.8125 15.9375V8.36937ZM4.6875 15.9375V8.8125H3C2.75136 8.8125 2.5129 8.91127 2.33709 9.08709C2.16127 9.2629 2.0625 9.50136 2.0625 9.75V15C2.0625 15.2486 2.16127 15.4871 2.33709 15.6629C2.5129 15.8387 2.75136 15.9375 3 15.9375H4.6875Z"
                      fill="currentColor"/>
            </svg>
            Like
        </div>
    )
};


LikeButton.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
};


function formatTime(date) {
    const now = new Date();
    const difference = formatDistance(new Date(date), now, { addSuffix: true });

    if (new Date() - new Date(date) > 365 * 24 * 60 * 60 * 1000) {
        return format(new Date(date), 'dd/MM/yyyy');
    }

    return difference;
}

function trackImpression(itemId) {
    const impressionSent = localStorage.getItem(`impression_sent_${itemId}`);

    if (!impressionSent) {
    fetch(`${API_BASE_URL}/Impression/?itemId=${itemId}`,{
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache'
    })
        .then(response => {
            if (response.ok) {
                localStorage.setItem(`impression_sent_${itemId}`, 'true');
            } else {
                console.error("Failed to send impression.");
            }
        })
        .catch(error => console.error("Error:", error));
    }
}
import React, { useEffect, useState } from 'react'
import { useCreateCommentMutation, useDeleteSinglePostMutation, useGetAllPostCommentsQuery, useGetCurrentUserQuery, useGetSinglePostQuery, useGetSingleUserMutation, useUpdateLikesMutation, useUpdateSavePostMutation } from '../store'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button';
import { getCookie } from '../helpers/cookies';
import { FaRegPaperPlane } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import Comments from '../components/Comments';

const SinglePostPage = ({ setProgress }) => {
    const jwt = getCookie("picsaJWT");
    const userId = getCookie("picsaUserId");
    const { id } = useParams();
    const { data: currUser, isFetching: userFetching } = useGetCurrentUserQuery(jwt);
    const { data: post, isFetching } = useGetSinglePostQuery(id);
    const [getPostUser, getResults] = useGetSingleUserMutation();
    const [deletePost, deleteResults] = useDeleteSinglePostMutation();
    const [likePost, likeResults] = useUpdateLikesMutation();
    const [savePost, saveResults] = useUpdateSavePostMutation();
    const [createComment, createResults] = useCreateCommentMutation();
    const [creator, setCreator] = useState();
    const [content, setContent] = useState();
    const [comment, setComment] = useState();

    const navigate = useNavigate();

    console.log(comment);

    const getPostCreator = async (id) => {
        await getPostUser(post.createdBy).unwrap().then((res) => {
            setCreator(res);
        }).catch((err) => {
            console.log(err);
        })
    };

    const handleLikes = async (id) => {
        setProgress(50);
        await likePost({ id, jwt }).unwrap().then((res) => {
            setProgress(100);
            console.log(res);
        }).catch((err) => {
            setProgress(100);
            console.log(err);
        })
    }

    const handleSave = async (id) => {
        setProgress(50);
        await savePost({ id, jwt }).unwrap().then((res) => {
            setProgress(100);
            window.location.reload();
        }).catch((err) => {
            console.log(err);
            setProgress(100);
        });
    }

    const handleComment = async () => {
        const data = {
            caption: comment,
            postId: post._id,
        };
        console.log(data);
        setProgress(50);
        await createComment({ data, jwt, postId: post._id }).unwrap().then((res) => {
            console.log(res);
            setProgress(100);
        }).catch((err) => {
            console.log(err);
            setProgress(100);
        });
    }

    const DeletePost = async (id) => {
        setProgress(50);
        await deletePost({ id, jwt, userId }).unwrap().then((res) => {
            console.log(res);
            setProgress(100);
            navigate("/profile");
        }).catch((err) => {
            console.log(err);
            setProgress(100);
        })
    }


    useEffect(() => {
        if(post){
            if(!creator){
                getPostCreator(post.createdBy);
            }
            else{
                const today = new Date();
                const postDate = new Date(post.createdAt);
                let string;
                if(today.getFullYear() === postDate.getFullYear() && today.getMonth() === postDate.getMonth() && today.getDate() === postDate.getDate()){
                    string = `${postDate.getHours()} : ${postDate.getMinutes()}`
                }
                else {
                    string = `${postDate.getDate()}-${postDate.getMonth()}-${postDate.getFullYear()}`
                }
                setContent(
                    <div className='create-post'>
                        <div className='photo'>
                            <img src={post.image} alt="post" />
                        </div>
                        <div className='post-details'>
                            <div className='profile'>
                                {creator.profilePic === "" ? (
                                    <div className='no-pic'>
                                        {creator.username[0]}
                                    </div>
                                ) : (
                                    <div className='pic'>
                                        <img src={creator.profilePic} alt='profilePic' />
                                    </div>
                                )}
                                <div className='username'>{creator.username}</div>
                            </div>
                            <div className='post-date'>
                                {string}
                            </div>
                            <div className='caption'>
                                {post.caption}
                            </div>
                            {jwt && (
                                <div className='feat'>
                                    <Button onClick={() => handleLikes(post._id)}>
                                        {JSON.parse(post.likes).includes(userId) ? <FaThumbsUp /> : <FaRegThumbsUp />}
                                        <p>Likes</p>
                                    </Button>
                                    <Button onClick={() => handleSave(post._id)}>
                                        {JSON.parse(currUser.saved_posts).includes(post._id) === true ? <GoBookmarkFill /> : <GoBookmark /> }
                                        <p>Save Post</p>
                                    </Button>
                                </div>
                            )}
                            <div className='likes'>
                                {JSON.parse(post.likes).length} likes
                            </div>
                            <Comments id={id} />
                            {jwt && (
                                <div className='comment'>
                                    <input 
                                        type='text' 
                                        name='comment' 
                                        placeholder='comment...'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                    <Button loading={createResults.isLoading} onClick={handleComment}>
                                        <FaRegPaperPlane />
                                    </Button>
                                </div>
                            )}
                            {creator._id === userId && (
                                <div className='buttons'>
                                    <Button loading={deleteResults.isLoading} onClick={() => DeletePost(post._id)}>
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            }
        }
        else if (isFetching || userFetching || getResults.isLoading) {
            setContent(
                <div className='post-skeleton'>
                    <div className='photo' />
                    <div className='post-details'>
                        <div className='profile'>
                            <div className='pic' />
                            <div className='username' />
                        </div>
                        <div className='caption' />
                        <div className='buttons'>
                            <div className='button' />
                        </div>
                    </div>
                </div>
            )
        }
        console.log(isFetching, '/');
        console.log(userFetching, '/');
        console.log(getResults.isLoading, '/');
    }, [post, creator, getResults.isLoading, isFetching, deleteResults.isLoading]);
    
    return content;
}

export default SinglePostPage
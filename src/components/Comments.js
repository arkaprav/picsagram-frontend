import React, { useEffect, useState } from 'react'
import { useDeleteCommentMutation, useGetAllPostCommentsQuery, useUpdateLikeCommentMutation } from '../store';
import { GoSync } from 'react-icons/go';
import PostProfile from '../pages/PostProfile';
import Button from './Button';
import { getCookie } from '../helpers/cookies';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

const Comments = ({ postId, setProgress }) => {
    const jwt = getCookie("picsaJWT");
    const userId = getCookie("picsaUserId");
    const { data: allComments } = useGetAllPostCommentsQuery(postId);
    const [content, setContent] = useState();
    const [updateLike, updateResults] = useUpdateLikeCommentMutation();
    const [deleteComment, deleteResults] = useDeleteCommentMutation();

    const handleDelete = async (id) => {
        setProgress(50);
        await deleteComment({ id, jwt, postId }).unwrap().then((re) => {
            setProgress(100);
            console.log(re);
        }).catch((Err) => {
            setProgress(100);
            console.log(Err);
        });
    }

    const handleLike = async (id) => {
        setProgress(50);
        await updateLike({ id, jwt, postId }).unwrap().then((re) => {
            setProgress(100);
            window.location.reload();
        }).catch((Err) => {
            setProgress(100);
            console.log(Err);
        });
    }

    useEffect(() => {
        if(allComments){
            if(allComments.length !== 0){
                console.log(allComments);
                setContent(
                    <div className='comments'>
                        {allComments.map((c) => {
                            console.log(JSON.parse(c.likes).includes(userId));
                            const today = new Date();
                            const postDate = new Date(c.createdAt);
                            let string;
                            if(today.getFullYear() === postDate.getFullYear() && today.getMonth() === postDate.getMonth() && today.getDate() === postDate.getDate()){
                                string = `${postDate.getHours()} : ${postDate.getMinutes()}`
                            }
                            else {
                                string = `${postDate.getDate()}-${postDate.getMonth()}-${postDate.getFullYear()}`
                            }
                            return (
                                <div className='single-comment'>
                                    <PostProfile id={c.commentedBy} />
                                    <p>
                                        <div>
                                            {c.caption}
                                        </div>
                                        <div>
                                            {string}
                                        </div>
                                    </p>
                                    <p style={{ marginTop: "0px"}}>
                                        <div>
                                            {JSON.parse(c.likes).includes(userId) ? <FaThumbsUp onClick={() => handleLike(c._id)} />: <FaRegThumbsUp onClick={() => handleLike(c._id)} />}
                                        </div>
                                        <div>
                                            <Button loading={deleteResults.isLoading} onClick={() => handleDelete(c._id)}>Delete</Button>
                                        </div>
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                );
            }
            else {
                setContent(
                    <div className='fetching'>
                        <div className='cap' style={{ fontSize: "15px" }}>No Comments Yet...</div>
                    </div>
                );
            }
        }
        else {
            setContent(
                <div className='fetching'>
                    <GoSync className='animate-spin' style={{ fontSize: "15px" }} />
                    <div className='cap' style={{ fontSize: "15px" }}>Loading Comments ...</div>
                </div>
            ); 
        }
    }, [allComments, updateResults.isLoading]);

  return content
}

export default Comments
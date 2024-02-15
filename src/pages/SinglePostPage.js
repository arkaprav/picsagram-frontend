import React, { useEffect, useState } from 'react'
import { useDeleteSinglePostMutation, useGetSinglePostQuery, useGetSingleUserMutation } from '../store'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button';
import { getCookie } from '../helpers/cookies';

const SinglePostPage = ({ setProgress }) => {
    const jwt = getCookie("picsaJWT");
    const userId = getCookie("picsaUserId");
    const { id } = useParams();
    const { data: post, isFetching } = useGetSinglePostQuery(id);
    const [getPostUser, getResults] = useGetSingleUserMutation();
    const [deletePost, deleteResults] = useDeleteSinglePostMutation();
    const [creator, setCreator] = useState();
    const [content, setContent] = useState();

    const navigate = useNavigate();

    const getPostCreator = async (id) => {
        await getPostUser(post.createdBy).unwrap().then((res) => {
            setCreator(res);
        }).catch((err) => {
            console.log(err);
        })
    };

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
                setContent(
                    <div className='create-post'>
                        <div className='photo'>
                            <img src={post.image} alt="post" />
                        </div>
                        <div className='post-details'>
                            <div className='profile'>
                                <div className='pic'>
                                    <img src={creator.profilePic} alt='profilePic' />
                                </div>
                                <div className='username'>{creator.username}</div>
                            </div>
                            <div className='caption'>
                                {post.caption}
                            </div>
                            <div className='buttons'>
                                <Button loading={deleteResults.isLoading} onClick={() => DeletePost(post._id)}>
                                    Delete
                                </Button>
                            </div>
                      </div>
                    </div>
                );
            }
        }
        else if (isFetching || getResults.isLoading) {
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
    }, [post, creator, getResults.isLoading, isFetching, deleteResults.isLoading]);
    
    return content;
}

export default SinglePostPage
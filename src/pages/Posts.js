import React, { useEffect, useState } from 'react'
import { useGetAllPostsQuery, useUpdateLikesMutation } from '../store'
import { div, useNavigate } from 'react-router-dom';
import PostProfile from './PostProfile';
import { GoSync } from 'react-icons/go';
import { getCookie } from '../helpers/cookies';
import Button from '../components/Button';
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

const Posts = ({ setProgress }) => {
    const { data: posts, isFetching } = useGetAllPostsQuery();
    const [content1, setContent1] = useState();
    const [content2, setContent2] = useState();
    const [content3, setContent3] = useState();
    const [content4, setContent4] = useState();
    const [fetching, setFetching] = useState();
    const [postLike, likeResults] = useUpdateLikesMutation();
    const jwt = getCookie("picsaJWT");
    const userId = getCookie("picsaUserId");
    const navigate = useNavigate();

    const updateLike = async (id) => {
        setProgress(50);
        await postLike({ id, jwt }).unwrap().then((res) => {
            console.log(res);
            setProgress(100);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if(posts) {
            const c1 = posts.filter((_,i) => {
                return i%4 === 0;
            });
            const c2 = posts.filter((_,i) => {
                return i%4 === 1;
            });
            const c3 = posts.filter((_,i) => {
                return i%4 === 2;
            });
            const c4 = posts.filter((_,i) => {
                return i%4 === 3;
            });
            setContent1(c1.map((c) => {
                const today = new Date();
                const postDate = new Date(c.createdAt);
                let string;
                if(today.getFullYear() === postDate.getFullYear() && today.getMonth() === postDate.getMonth() && today.getDate() === postDate.getDate()){
                    string = `${postDate.getHours()} : ${postDate.getMinutes()}`
                }
                else {
                    string = `${postDate.getDate()}-${postDate.getMonth()}-${postDate.getFullYear()}`
                }
                return <div >
                    <div className='single-post'>
                        <img 
                            src={c.image} 
                            alt={c.caption}
                            onDoubleClick={() => updateLike(c._id)}
                        />
                        <div className='post-buttons'>
                          <Button loading={likeResults.isLoading} onClick={() => updateLike(c._id)}>
                              {JSON.parse(c.likes).includes(userId) ? <FaThumbsUp /> : <FaRegThumbsUp />}
                          </Button>
                          <Button onClick={() => navigate(`post/${c._id}`)}>
                              <FaRegComment />
                          </Button>
                        </div>
                        <PostProfile id={c.createdBy} />
                        <p>
                            <div>
                                {c.caption}
                            </div>
                            <div>
                                {string}
                            </div>
                        </p>
                    </div>
                </div>
            }));
            setContent2(c2.map((c) => {
                const today = new Date();
                const postDate = new Date(c.createdAt);
                let string;
                if(today.getFullYear() === postDate.getFullYear() && today.getMonth() === postDate.getMonth() && today.getDate() === postDate.getDate()){
                    string = `${postDate.getHours()} : ${postDate.getMinutes()}`
                }
                else {
                    string = `${postDate.getDate()}-${postDate.getMonth()}-${postDate.getFullYear()}`
                }
                return <div >
                    <div className='single-post'>
                        <img  
                            src={c.image} 
                            alt={c.caption}
                            onDoubleClick={() => updateLike(c._id)}
                        />
                        <div className='post-buttons'>
                          <Button loading={likeResults.isLoading} onClick={() => updateLike(c._id)}>
                              {JSON.parse(c.likes).includes(userId) ? <FaThumbsUp /> : <FaRegThumbsUp />}
                          </Button>
                          <Button onClick={() => navigate(`post/${c._id}`)}>
                              <FaRegComment />
                          </Button>
                        </div>  
                        <PostProfile id={c.createdBy} />
                        <p>
                            <div>
                                {c.caption}
                            </div>
                            <div>
                                {string}
                            </div>
                        </p>
                    </div>
                </div>
            }));
            setContent3(c3.map((c) => {
                const today = new Date();
                const postDate = new Date(c.createdAt);
                let string;
                if(today.getFullYear() === postDate.getFullYear() && today.getMonth() === postDate.getMonth() && today.getDate() === postDate.getDate()){
                    string = `${postDate.getHours()} : ${postDate.getMinutes()}`
                }
                else {
                    string = `${postDate.getDate()}-${postDate.getMonth()}-${postDate.getFullYear()}`
                }
                return <div >
                    <div className='single-post'>
                        <img  
                            src={c.image} 
                            alt={c.caption}
                            onDoubleClick={() => updateLike(c._id)}
                        />
                        <div className='post-buttons'>
                          <Button loading={likeResults.isLoading} onClick={() => updateLike(c._id)}>
                              {JSON.parse(c.likes).includes(userId) ? <FaThumbsUp /> : <FaRegThumbsUp />}
                          </Button>
                          <Button onClick={() => navigate(`post/${c._id}`)}>
                              <FaRegComment />
                          </Button>
                        </div>  
                        <PostProfile id={c.createdBy} />
                        <p>
                            <div>
                                {c.caption}
                            </div>
                            <div>
                                {string}
                            </div>
                        </p>
                    </div>
                </div>
            }));
            setContent4(c4.map((c) => {
                const today = new Date();
                const postDate = new Date(c.createdAt);
                let string;
                if(today.getFullYear() === postDate.getFullYear() && today.getMonth() === postDate.getMonth() && today.getDate() === postDate.getDate()){
                    string = `${postDate.getHours()} : ${postDate.getMinutes()}`
                }
                else {
                    string = `${postDate.getDate()}-${postDate.getMonth()}-${postDate.getFullYear()}`
                }
                return <div >
                    <div className='single-post'>
                        <img  
                            src={c.image} 
                            alt={c.caption}
                            onDoubleClick={() => updateLike(c._id)}
                        />
                        <div className='post-buttons'>
                          <Button loading={likeResults.isLoading} onClick={() => updateLike(c._id)}>
                              {JSON.parse(c.likes).includes(userId) ? <FaThumbsUp /> : <FaRegThumbsUp />}
                          </Button>
                          <Button onClick={() => navigate(`post/${c._id}`)}>
                              <FaRegComment />
                          </Button>
                        </div>  
                        <PostProfile id={c.createdBy} />
                        <p>
                            <div>
                                {c.caption}
                            </div>
                            <div>
                                {string}
                            </div>
                        </p>
                    </div>
                </div>
            }));
            setFetching();
        }
        if(isFetching){
            setFetching(
                <div className='fetching'>
                    <GoSync className='animate-spin' />
                    <div className='cap'>Loading Posts ...</div>
                </div>
            )
            setContent1();
            setContent2();
            setContent3();
            setContent4();
        }
    }, [posts, isFetching]);

    return (
        <div className='all-posts'>
            <div className='single-post-col'>
                {content1}
            </div>
            <div className='single-post-col'>
                {content2}
            </div>
            <div className='single-post-col'>
                {content3}
            </div>
            <div className='single-post-col'>
                {content4}
            </div>
            {fetching}
        </div>
    )
}

export default Posts
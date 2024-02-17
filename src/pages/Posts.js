import React, { useEffect, useState } from 'react'
import { useGetAllPostsQuery } from '../store'
import { NavLink } from 'react-router-dom';
import PostProfile from './PostProfile';
import { GoSync } from 'react-icons/go';

const Posts = () => {
    const { data: posts, isFetching } = useGetAllPostsQuery();
    const [content1, setContent1] = useState();
    const [content2, setContent2] = useState();
    const [content3, setContent3] = useState();
    const [content4, setContent4] = useState();
    const [content5, setContent5] = useState();
    const [fetching, setFetching] = useState();

    useEffect(() => {
        if(posts) {
            const c1 = posts.filter((_,i) => {
                return i%5 === 0;
            });
            const c2 = posts.filter((_,i) => {
                return i%5 === 1;
            });
            const c3 = posts.filter((_,i) => {
                return i%5 === 2;
            });
            const c4 = posts.filter((_,i) => {
                return i%5 === 3;
            });
            const c5 = posts.filter((_,i) => {
                return i%5 === 4;
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
                return <NavLink to={`post/${c._id}`}>
                    <div className='single-post'>
                        <img src={c.image} alt={c.caption} />
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
                </NavLink>
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
                return <NavLink to={`post/${c._id}`}>
                    <div className='single-post'>
                        <img src={c.image} alt={c.caption} />
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
                </NavLink>
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
                return <NavLink to={`post/${c._id}`}>
                    <div className='single-post'>
                        <img src={c.image} alt={c.caption} />
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
                </NavLink>
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
                return <NavLink to={`post/${c._id}`}>
                    <div className='single-post'>
                        <img src={c.image} alt={c.caption} />
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
                </NavLink>
            }));
            setContent5(c5.map((c) => {
                const today = new Date();
                const postDate = new Date(c.createdAt);
                let string;
                if(today.getFullYear() === postDate.getFullYear() && today.getMonth() === postDate.getMonth() && today.getDate() === postDate.getDate()){
                    string = `${postDate.getHours()} : ${postDate.getMinutes()}`
                }
                else {
                    string = `${postDate.getDate()}-${postDate.getMonth()}-${postDate.getFullYear()}`
                }
                return <NavLink to={`post/${c._id}`}>
                    <div className='single-post'>
                        <img src={c.image} alt={c.caption} />
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
                </NavLink>
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
            <div className='single-post-col'>
                {content5}
            </div>
            {fetching}
        </div>
    )
}

export default Posts
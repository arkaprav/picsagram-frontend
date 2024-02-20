import React, { useEffect, useState } from 'react'
import { useGetAllPostCommentsQuery } from '../store';
import { GoSync } from 'react-icons/go';
import PostProfile from '../pages/PostProfile';

const Comments = ({ id }) => {
    const { data: allComments } = useGetAllPostCommentsQuery(id);
    const [content, setContent] = useState();

    useEffect(() => {
        if(allComments){
            setContent(
                <div className='comments'>
                    {allComments.map((c) => {
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
                            </div>
                        )
                    })}
                </div>
            );
        }
        else {
            setContent(
                <div className='fetching'>
                    <GoSync className='animate-spin' style={{ fontSize: "15px" }} />
                    <div className='cap' style={{ fontSize: "15px" }}>Loading Comments ...</div>
                </div>
            ); 
        }
    }, [allComments]);

  return content
}

export default Comments
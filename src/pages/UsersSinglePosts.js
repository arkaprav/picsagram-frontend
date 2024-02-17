import React, { useEffect, useState } from 'react'
import { useGetSinglePostQuery } from '../store'
import { NavLink } from 'react-router-dom';

const UsersSinglePosts = ({ id }) => {
    const { data: p } = useGetSinglePostQuery(id);
    const [content, setContent] = useState();

    useEffect(() => {
        if(p){
            setContent(
                <NavLink to={`/post/${p._id}`}>
                    <div className='post'>
                    <div className='image'>
                        <img src={p.image} alt={p.caption} />
                    </div>
                    </div>
                </NavLink>
            )
        }
        else {
            setContent(
                <div className='post-skletan' />
            )
        }
    }, [p]);

  return content;
}

export default UsersSinglePosts
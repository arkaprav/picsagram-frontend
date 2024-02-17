import React, { useEffect, useState } from 'react'
import { useGetUserPostsQuery } from '../store';
import { getCookie } from '../helpers/cookies';
import { NavLink } from 'react-router-dom';

const UserPosts = () => {
  const id = getCookie("picsaUserId");
  const { data: posts } = useGetUserPostsQuery(id);
  const [content, setContent] = useState();

  useEffect(() => {
    if(posts) {
      if(posts.length === 0) {
        setContent(
          <div className='no-prod'>
            No Posts Yet...
          </div>
        )
      }
      else {
        setContent(
          <>
            {posts.map((p) => {
              return <NavLink to={`/post/${p._id}`}>
                <div className='post'>
                  <div className='image'>
                    <img src={p.image} alt={p.caption} />
                  </div>
                </div>
              </NavLink>
            })}
          </>
        )
      }
    }
    else {
      setContent(
        <>
          <div className='post-skletan' />
          <div className='post-skletan' />
          <div className='post-skletan' />
          <div className='post-skletan' />
        </>
      )
    }
  }, [posts]);

  return (
    <div className='created'>
      {content}
    </div>
  )
}

export default UserPosts
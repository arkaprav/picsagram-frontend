import React, { useEffect, useState } from 'react'
import { getCookie } from '../helpers/cookies';
import { useGetCurrentUserQuery } from '../store';
import UsersSinglePosts from './UsersSinglePosts';

const UserSaved = () => {
  const jwt = getCookie("picsaJWT");
  const { data: currUser } = useGetCurrentUserQuery(jwt);
  const [content, setContent] = useState();

  useEffect(() => {
    if(currUser){
      const sp = JSON.parse(currUser.saved_posts);
      if(sp.length !== 0){
        setContent(sp.map((s) => {
          return <UsersSinglePosts id={s} />;
        }));
      }
      else {
        setContent(
          <div className='no-prod'>
            No Posts Yet...
          </div>
        );
      }
    }
    else{
      setContent(
        <>
          <div className='post-skletan' />
          <div className='post-skletan' />
          <div className='post-skletan' />
          <div className='post-skletan' />
        </>
      )
    }
  }, [currUser]);

  return (
    <div className='created'>
      {content}
    </div>
  )
}

export default UserSaved
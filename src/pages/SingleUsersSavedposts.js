import React, { useEffect, useState } from 'react'
import UsersSinglePosts from './UsersSinglePosts';
import { useGetSingleUserMutation } from '../store';
import { useParams } from 'react-router-dom';

const SingleUsersSavedposts = () => {
    const { id } = useParams();
    const [getUser, getResults] = useGetSingleUserMutation();
    const [currUser, setCurrUser] = useState();
    const [content, setContent] = useState();

    useEffect(() => {
        const handleGet = async () => {
            await getUser(id).unwrap().then((res) => {
                setCurrUser(res);
            }).catch((err) => {
                console.log(err);
            });
        }
        handleGet();
    }, [getResults.isLoading]);

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

export default SingleUsersSavedposts
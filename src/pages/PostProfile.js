import React, { useEffect, useState } from 'react'
import { useGetSingleUserMutation } from '../store';

const PostProfile = ({ id }) => {
    const [getUser, getResults] = useGetSingleUserMutation();
    const [data,setData] = useState();
    const [content, setContent] = useState();
    useEffect(() => {
        const fetchUser = async () => {
            await getUser(id).unwrap().then((res) => {
                console.log(res);
                setData(res);
            }).catch((err) => {
                console.log(err);
            });
        }
        fetchUser();
    }, [getUser, id]);

    useEffect(() => {
        if(getResults.isLoading){
            setContent(
                <div className='user-skeleton'>
                    <div className='user-logo' />
                    <div className='username' />
                </div>
            )
        }
        else {
            if(data){
                setContent(
                    <div className='profile'>
                        <div className='pic'>
                            <img src={data.profilePic} alt='profilePic' />
                        </div>
                        <div className='username'>{data.username}</div>
                    </div>
                )
            }
        }
    }, [getResults, data]);
  return content;
}

export default PostProfile
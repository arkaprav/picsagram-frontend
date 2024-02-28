import React, { useEffect, useState } from 'react'
import { useGetSingleUserMutation } from '../store';
import { NavLink } from 'react-router-dom';
import { getCookie } from '../helpers/cookies';

const PostProfile = ({ id }) => {
    const userId = getCookie("picsaUserId");
    const [getUser, getResults] = useGetSingleUserMutation();
    const [data,setData] = useState();
    const [content, setContent] = useState();
    useEffect(() => {
        const fetchUser = async () => {
            await getUser(id).unwrap().then((res) => {
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
                const url = userId === id ? '/profile': `/single-user/${data._id}/profile`;
                setContent(
                    <NavLink to={url}>
                        <div className='profile'>
                            {data.profilePic === "" ? (
                                <div className='no-pic'>
                                    {data.username[0]}
                                </div>
                            ) : (
                                <div className='pic'>
                                    <img src={data.profilePic} alt='profilePic' />
                                </div>
                            )}
                            <div className='username'>{data.username}</div>
                        </div>
                    </NavLink>
                )
            }
        }
    }, [getResults, data, id, userId]);
  return content;
}

export default PostProfile
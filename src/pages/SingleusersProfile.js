import React, { useEffect, useState } from 'react'
import { useFollowUserMutation, useGetSingleUserMutation, useGetUserPostsQuery, useUnFollowUserMutation } from '../store';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { getCookie } from '../helpers/cookies';

const SingleUserProfile = ({ setProgress }) => {
    const jwt = getCookie("picsaJWT");
    const userId = getCookie("picsaUserId");
    const { id } = useParams();
    const [getUser, getResults] = useGetSingleUserMutation();
    const [followUser, followResults] = useFollowUserMutation();
    const [unFolowUser, unfollowResults] = useUnFollowUserMutation();
    const { data: posts, isFetching: postFetching } = useGetUserPostsQuery(id);
    const [user, setUser] = useState();
    const handleGetUser = async () => {
        await getUser(id).unwrap().then((res) => {
            setUser(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        handleGetUser();
    }, [id]);

    const handleFollowUser = async () => {
        setProgress(50);
        await followUser({ jwt, id }).unwrap().then((res) => {
            setProgress(100);
            handleGetUser();
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleUnFollowUser = async () => {
        setProgress(50);
        await unFolowUser({ jwt, id }).unwrap().then((res) => {
            setProgress(100);
            handleGetUser();
        }).catch((err) => {
            console.log(err);
        });
    }

    let content;
    if(getResults.isLoading || postFetching){
        content = <div className='skeleton'>
            <div className='profilePic' />
            <div className='name' />
            <div className='userd'>
                <div className='email' />
                <div className='phone' />
            </div>
            <div className='details'>
                <div className='cont' />
                <div className='cont' />
                <div className='cont' />
            </div>
            <div className='buttons'>
                <div />
                <div />
            </div>
            <div className='posts'>
                <div>Posts</div>
                <div>Saved</div>
            </div>
        </div>;
    }
    else {
        content = <div className='profile-page'>
            { user.profilePic === "" ? (
                <div className='profilePic'>
                    {user.username[0]}
                </div>
            ) : (
                <div className='profile-pic'>
                    <img src={user.profilePic} alt='profile-pic' />
                </div>
            )}
            <div className='name'>{user.username}</div>
            <div className='details'>
                <div className='email'>
                    {user.email}
                </div>
                <div className='phone'>
                    {user.phone}
                </div>
            </div>
            <div className='follow'>
                <div>{JSON.parse(user.follower).length} followers</div>
                <div>{JSON.parse(user.following).length} following</div>
                <div>{posts && posts.length} posts</div>
            </div>
            {jwt && (
                <div className='buttons'>
                    { JSON.parse(user.follower).includes(userId) ? (
                        <div className='edit' onClick={handleUnFollowUser}>
                            UnFollow
                        </div>
                        
                    ) : (
                        <div className='edit' onClick={handleFollowUser}>
                            Follow
                        </div>
                    )}
                    <div className='create'>
                        Message
                    </div>
                </div>
            )}
            <div className='posts'>
                <NavLink to={`/single-user/${id}/profile`}>
                    <div>Posts</div>
                </NavLink>
                <NavLink to={`/single-user/${id}/profile/saved`}>
                    <div>Saved</div>
                </NavLink>
            </div>
            <Outlet />
        </div>
    }
    return content;
}

export default SingleUserProfile
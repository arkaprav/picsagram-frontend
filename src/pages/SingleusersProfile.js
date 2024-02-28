import React, { useEffect, useState } from 'react'
import { useGetSingleUserMutation, useGetUserPostsQuery } from '../store';
import { NavLink, Outlet, useParams } from 'react-router-dom';

const SingleUserProfile = () => {
    const { id } = useParams();
    const [getUser, getResults] = useGetSingleUserMutation();
    const { data: posts, isFetching: postFetching } = useGetUserPostsQuery(id);
    const [user, setUser] = useState();

    useEffect(() => {
        const handleGetUser = async () => {
            await getUser(id).unwrap().then((res) => {
                setUser(res);
            }).catch((err) => {
                console.log(err);
            });
        }
        handleGetUser();
    }, [id]);

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
            <div className='buttons'>
                <div className='edit'>
                    Follow
                </div>
                <div className='create'>
                    Message
                </div>
            </div>
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
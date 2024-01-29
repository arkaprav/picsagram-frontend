import React from 'react'
import { useGetCurrentUserQuery } from '../store';
import { getCookie } from '../helpers/cookies';
import { NavLink, useNavigate } from 'react-router-dom';

const Profile = () => {
    const jwt = getCookie("picsaJWT");
    const { data: user, error: userError, isFetching: userFetching} = useGetCurrentUserQuery(jwt);
    const navigate = useNavigate();
    let content;
    if(userError) {
        navigate("/");
    }
    else if(userFetching){
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
                <div />
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
                <div>{JSON.parse(user.no_of_posts).length} posts</div>
            </div>
            <div className='buttons'>
                <NavLink to='/edit-profile'>
                    <div className='edit'>
                        Edit Profile
                    </div>
                </NavLink>
                <NavLink to='/create-post'>
                    <div className='create'>
                        + Create Post
                    </div>
                </NavLink>
            </div>
            <div className='posts'>
                <div>Posts</div>
                <div>Saved</div>
            </div>
        </div>
    }
    return content;
}

export default Profile
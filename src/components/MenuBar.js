import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { GoHomeFill } from "react-icons/go";
import { FaFacebookMessenger } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { delCookie, getCookie } from '../helpers/cookies';
import { useGetCurrentUserQuery } from '../store';


const MenuBar = ({ setProgress }) => {
    const jwt = getCookie("picsaJWT");
    const { data: user, isFetching } = useGetCurrentUserQuery(jwt);
    const [parent, enable] = useAutoAnimate({ duration: 350 });
    const [content, setContent] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        enable(true);
    }, [parent, enable]);

    useEffect(() => {
        if(user) {
            setContent(
                <div className='user'>
                    {
                        user.profilePic !== "" ? (
                            <div className='profile-logo'>
                                <img src={user.profilePic} alt='profilePic' />
                            </div>
                        ) : (
                            <div className='user-logo'>{user.username[0]}</div>
                        )
                    }
                    <div className='name'>{user.username}</div>
                </div>
            );
        }
        else if(isFetching) {
            setContent(
                <div className='user-skeleton'>
                    <div className='user-logo' />
                    <div className='username' />
                </div>
            );
        }
    }, [user, isFetching]);

    return (
        <div className='container' ref={parent}>
            <div className='main-container' ref={parent}>
                <Outlet />
            </div>
            <div className='top-menu-bar'>
                <NavLink to="/">
                    <div className='logo'>
                        <img src={window.location.origin + `/favicon.ico`} alt='picsagram logo' />
                    </div>
                </NavLink>
                <div className='menu-items'>
                    <NavLink to="/">
                        <GoHomeFill />
                    </NavLink>
                    <NavLink to="/message">
                        <FaFacebookMessenger />
                    </NavLink>
                    <NavLink to="/search">
                        <FaSearch />
                    </NavLink>
                </div>
                {jwt ? (
                    <div className='profile'>
                        <NavLink to="/profile">
                            {content}
                        </NavLink>
                        <div className='menu-invert' onClick={() => { delCookie("picsaJWT"); navigate("/login"); }}>
                            Log Out
                        </div>
                    </div>
                ):
                (
                    <div className='profile'>
                        <NavLink to="/login">
                            <div className='menu'>
                                Log In
                            </div>
                        </NavLink>
                        <NavLink to="/signup">
                            <div className='menu-invert'>
                                Sign Up
                            </div>
                        </NavLink>
                    </div>
                )}
            </div>
            <div className='hiding'>
                <NavLink to="/">
                    <GoHomeFill />
                </NavLink>
                <NavLink to="/message">
                    <FaFacebookMessenger />
                </NavLink>
                <NavLink to="/search">
                    <FaSearch />
                </NavLink>
            </div>
        </div>
    )
}

export default MenuBar
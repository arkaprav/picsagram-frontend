import React, { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { GoHomeFill } from "react-icons/go";
import { FaFacebookMessenger } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { delCookie, getCookie } from '../helpers/cookies';


const MenuBar = ({ setProgress }) => {
    const jwt = getCookie("picsaJWT");
    const profilePic = getCookie("picsaProfilePic");
    const username = getCookie("picsaUsername");
    const [parent, enable] = useAutoAnimate({ duration: 350 });

    const navigate = useNavigate();

    useEffect(() => {
        enable(true);
    }, [parent, enable]);
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
                            <div className='user'>
                                {
                                    profilePic !== "" ? (
                                        <div className='logo'>
                                            <img src={profilePic} alt='company-log' />
                                        </div>
                                    ) : (
                                        <div className='user-logo'>{username[0]}</div>
                                    )
                                }
                                <div className='name'>{username}</div>
                            </div>
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
        </div>
    )
}

export default MenuBar
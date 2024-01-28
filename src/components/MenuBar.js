import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { GoHomeFill } from "react-icons/go";
import { FaFacebookMessenger } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useAutoAnimate } from "@formkit/auto-animate/react";


const MenuBar = ({ setProgress }) => {
    const [parent, enable] = useAutoAnimate({ duration: 350 });
    useEffect(() => {
        enable(true);
    }, [parent, enable]);
  return (
    <div className='container' ref={parent}>
        <div className='main-container'>
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
        </div>
    </div>
  )
}

export default MenuBar
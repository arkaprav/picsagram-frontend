import React, { useEffect, useState } from 'react'
import { Routes, useLocation } from 'react-router-dom'

const CustomeRoutes = ({ setProgress, children }) => {
    const location = useLocation();
    const[prevLoc, setPrevLoc] = useState();
    useEffect(() => {
        if(prevLoc !== location.pathname){
            setProgress(100);
            setPrevLoc(location.pathname);
        }
    }, [location, prevLoc, setProgress]);
  return <Routes>{children}</Routes>
}

export default CustomeRoutes
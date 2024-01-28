import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useLoginMutation } from '../store';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../helpers/cookies';

const LogIn = ({ setProgress }) => {
    const [parent, enable] = useAutoAnimate({ duration: 350 });
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [loginUser, loginResults] = useLoginMutation();

    useEffect(() => {
        enable(true);
    }, [parent, enable]);

    const navigate = useNavigate();

    const handleLogin = async () => {
        const data = {
            name,
            password
        }
        setProgress(50);
        await loginUser(data).unwrap().then((res) => {
            setProgress(100);
            setCookie("picsaJWT", res.jwt, 7);
            setCookie("picsaProfilePic", res.profilePic, 7);
            setCookie("picsaUsername", res.username, 7);
            navigate("/");
        }).catch((err) => {
            setError(err.data.message);
            setProgress(100);
        });
    }

    return (
        <div className='auth' ref={parent}>
            <div className='logo'>
                <img src={process.env.PUBLIC_URL + `logo-white.png`} alt='company logo' />
            </div>
            <div className='header'>
                Log In
            </div>
            <div className='inputs'>
                <input type='text' name='username' placeholder='username or email or phone' value={name} onChange={(e) => setName(e.target.value)} />
                <input type='text' name='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && (
                <div className='error'>
                    {error}
                </div>
            )}
            <div className='buttons'>
                <Button loading={loginResults.isLoading} onClick={handleLogin}>
                    Log In
                </Button>
            </div>
        </div>
    )
}

export default LogIn
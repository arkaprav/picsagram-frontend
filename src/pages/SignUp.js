import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useRegisterMutation } from '../store';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ setProgress }) => {
    const [parent, enable] = useAutoAnimate({ duration: 350 });
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [conPassword, setConPassword] = useState();
    const [error, setError] = useState();
    const [registerUser, registrationResults] = useRegisterMutation();

    useEffect(() => {
        enable(true);
    }, [parent, enable]);

    const navigate = useNavigate();

    const handleRegister = async () => {
        if(!email.includes("@gmail.com")){
            setError("Invalid Email");
        }
        else if(password !== conPassword){
            setError("password doesn't match")
        }
        else if(phone.length !== 10){
            setError("Invalid Phone No.");
        }
        else {
            const data = {
                username,
                email,
                phone,
                password
            }
            setProgress(50);
            await registerUser(data).unwrap().then((res) => {
                setProgress(100);
                navigate("/login");
            }).catch((err) => {
                setError(err.data.message);
                setProgress(100);
            });
        }
    }

    useEffect(() => {
        if(password !== conPassword && password && conPassword){
            setError("passwords doesn't match");
        }
        else{
            setError();
        }
    }, [password, conPassword]);

    return (
        <div className='auth' ref={parent}>
            <div className='logo'>
                <img src={process.env.PUBLIC_URL + `logo-white.png`} alt='company logo' />
            </div>
            <div className='header'>
                Sign Up
            </div>
            <div className='inputs'>
                <input type='text' name='username' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type='text' name='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}  />
                <input type='text' name='phone' placeholder='phone' value={phone} onChange={(e) => setPhone(e.target.value)}  />
                <input type='text' name='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type='text' name='confirm-password' placeholder='confirm password' value={conPassword} onChange={(e) => setConPassword(e.target.value)}  />
            </div>
            {error && (
                <div className='error'>
                    {error}
                </div>
            )}
            <div className='buttons'>
                <Button loading={registrationResults.isLoading} onClick={handleRegister}>Register</Button>
            </div>
        </div>
    )
}

export default SignUp
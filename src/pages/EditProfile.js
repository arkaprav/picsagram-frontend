import React, { useEffect, useState } from 'react'
import Button from '../components/Button';
import { useGetCurrentUserQuery, useUpdateUserMutation } from '../store';
import { getCookie } from '../helpers/cookies';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from "react-icons/fa";

const EditProfile = () => {
  
  const jwt = getCookie("picsaJWT");
  const { data: user, error: userError, isFetching: userFetching} = useGetCurrentUserQuery(jwt);
  const [updateUser, updateResults] = useUpdateUserMutation();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [display, setDisplay] = useState(false);
  const [profilePic, setProfilePic] = useState();
  const [tempProfilePic, setTempProfilePic] = useState();
  const [picContent, setPicContent] = useState();
  const navigate = useNavigate();
  let content;

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = () => {
      setTempProfilePic(input.files[0]);
    };
    input.click();
  }

  const handleUpdate = async () => {
    const form = new FormData();
    if(tempProfilePic !== ""){
      form.append("profile_pic", tempProfilePic);
    }
    form.append("username", username);
    form.append("email", email);
    form.append("phone", phone);
    await updateUser({ data: form, jwt }).unwrap().then(res => console.log(res)).catch(err => console.log(err));
  }

  useEffect(() => {
    if(user){
      setUsername(user.username);
      setEmail(user.email);
      setPhone(user.phone);
      setProfilePic(user.profilePic);
    }
  }, [user]);

  useEffect(() => {
    if(tempProfilePic){
      setPicContent(
        <div className='profile-pic' onMouseEnter={() => setDisplay(true)} onMouseLeave={() => setDisplay(false)}>
          <img src={URL.createObjectURL(tempProfilePic)} alt='profile-pic' />
        </div>
      )
    }
    else if(profilePic === ""){
      setPicContent(
        <div className='profilePic' onMouseEnter={() => setDisplay(true)} onMouseLeave={() => setDisplay(false)}>
            {user.username[0]}
        </div>
      )
    }
    else{
      setPicContent(
        <div className='profile-pic' onMouseEnter={() => setDisplay(true)} onMouseLeave={() => setDisplay(false)}>
          <img src={profilePic} alt='profile-pic' />
        </div>
      )
    }
  }, [profilePic, tempProfilePic, user])

  if(userError) {
      navigate("/");
  }
  else if(userFetching){
      content = <div className='skeleton'>
          <div className='profilePic' />
          <div className='field' />
          <div className='field' />
          <div className='field' />
          <div className='buttons'>
            <div />
          </div>
      </div>;
  }
  else {
      content = <div className='profile-page'>
          {picContent}
          <div
            className='hover'
            style={{ display: display ? "flex" : "none" }} 
            onMouseEnter={() => setDisplay(true)} 
            onMouseLeave={() => setDisplay(false)}
            onClick={handleClick}
          >
            <FaCamera />
            <p>Change or Add new profile picture</p>
          </div>
          <input type='text' name='username' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type='text' name='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='number' name='phone no.' placeholder='phone no.' value={phone} onChange={(e) => setPhone(e.target.value)} />
          <div className='buttons'>
            <Button loading={updateResults.isLoading} onClick={handleUpdate}>
              Update
            </Button>
          </div>
      </div>
  }
  return content;
}

export default EditProfile
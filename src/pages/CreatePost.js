import React, { useEffect, useState } from 'react'
import { useCreatePostMutation, useCreateReelMutation, useGetCurrentUserQuery } from '../store';
import { getCookie } from '../helpers/cookies';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ setProgress }) => {
  const jwt = getCookie("picsaJWT");
  const id = getCookie("picsaUserId");
  const { data: user, isFetching } = useGetCurrentUserQuery(jwt);
  const [createPost, createResults] = useCreatePostMutation();
  const [createReels, reelsResults] = useCreateReelMutation();
  const [caption, setCaption] = useState();
  const [photo, setPhoto] = useState();
  const [content, setContent] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      setContent(
        <div className='profile'>
          <div className='pic'>
            <img src={user.profilePic} alt='profilePic' />
          </div>
          <div className='username'>{user.username}</div>
        </div>
      );
    }
    else if (isFetching) {
      setContent(
        <div className='user-skeleton'>
            <div className='user-logo' />
            <div className='username' />
        </div>
      );
    }
  }, [user, isFetching]);

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = () => {
      if(input.files[0].size < 16777216){
        setPhoto(input.files[0]);
      }
      else {
        alert("File Size Must Be Less than 16MB!!");
      }
    };
    input.click();
  }

  const handleCreatePost = async () => {
    setProgress(50);
    if(photo.type.includes("image/")){
      const data = new FormData();
      if(photo.size < 16777216){
        data.append("post_image", photo);
        data.append("caption", caption);
        await createPost({ data, jwt, id }).unwrap().then((res) => {
          navigate(`/post/${res._id}`);
          setProgress(100);
        }).catch(err => {
          console.log(err);
          setProgress(100);
        });
      } else {
        alert("Image size must be below 16MB!!");
      }
    }
    if(photo.type.includes("video/")){
      const data = new FormData();
      console.log("size",photo.size);
      if(photo.size < 16777216) {
        data.append("reel_video",photo);
        data.append("caption", caption);
        await createReels({ data, jwt, id }).unwrap().then((res) => {
          console.log(res);
          setProgress(100);
        }).catch(err => {
          console.log(err);
          setProgress(100);
        });
      } else {
        alert("Video size must be below 16MB!!");
      }
      
    }
  }

  return (
    <div className='create-post'>
      <div className='photo' onClick={handleUpload}>
        { photo ? ( photo.type.includes("image/") ? <img src={URL.createObjectURL(photo)} alt="post" /> : <video width="308px" height="408px" controls loop autoPlay>
          <source src={URL.createObjectURL(photo)} type='video/mp4' width="100%" height="100%" />
        </video>) : "Browse/Drag the Photo/Video"}
      </div>
      <div className='post-details'>
        {content}
        <div className='caption'>
          <input type='text' name='caption' value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="caption..." />
        </div>
        <div className='buttons'>
          <Button loading={createResults.isLoading || reelsResults.isLoading} onClick={handleCreatePost}>
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
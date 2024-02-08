import React, { useEffect, useState } from 'react'
import { useCreatePostMutation, useGetCurrentUserQuery } from '../store';
import { getCookie } from '../helpers/cookies';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ setProgress }) => {
  const jwt = getCookie("picsaJWT");
  const id = getCookie("picsaUserId");
  const { data: user, isFetching } = useGetCurrentUserQuery(jwt);
  const [createPost, createResults] = useCreatePostMutation();
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
      setPhoto(input.files[0]);
    };
    input.click();
  }

  const handleCreatePost = async () => {
    const data = new FormData();
    data.append("post_image", photo);
    data.append("caption", caption);
    setProgress(50);
    await createPost({ data, jwt, id }).unwrap().then((res) => {
      navigate(`/post/${res._id}`);
      setProgress(100);
    }).catch(err => {
      console.log(err);
      setProgress(100);
    });
  }

  return (
    <div className='create-post'>
      <div className='photo' onClick={handleUpload}>
        { photo ? <img src={URL.createObjectURL(photo)} alt="post" /> : "Browse/Drag the Photo"}
      </div>
      <div className='post-details'>
        {content}
        <div className='caption'>
          <input type='text' name='caption' value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="caption..." />
        </div>
        <div className='buttons'>
          <Button loading={createResults.isLoading} onClick={handleCreatePost}>
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
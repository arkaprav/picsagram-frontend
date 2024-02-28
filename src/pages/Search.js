import React, { useEffect, useState } from 'react'
import { useGetAllUsersQuery } from '../store'
import PostProfile from './PostProfile';
import { getCookie } from '../helpers/cookies';

const Search = () => {
  const id = getCookie("picsaUserId");
  const { data: users, isFetching: usersFetching } = useGetAllUsersQuery();
  const [searchName, setSearchName] = useState("");
  const [content, setContent] = useState();
  const handleReset = () => setSearchName("");
  useEffect(() => {
    if(users){
      const newUsers = users.filter((u) => {
        return u._id !== id;
      });
      if(newUsers.length !== 0){
        if(searchName !== ""){
          const filtered = newUsers.filter((u) => {
            return u.username.includes(searchName);
          });
          if(filtered.length !== 0){
            setContent(filtered.map((u) => {
              console.log(u);
              return <PostProfile id={u._id} />;
            }));
          }
          else {
            setContent(
              <div className='no-prod'>
                No Users Found...
              </div>
            )
          }
        }
        else {
          setContent(newUsers.map((u) => {
            console.log(u);
            return <PostProfile id={u._id} />;
          }));
        }
      }
    }
    else if(usersFetching){
      setContent(
        <div className='no-prod'>
          Loading Users...
        </div>
      )
    }
  }, [users, usersFetching, searchName, id]);
  return (
    <div className='page'>
      <div className='search'>
        <input
          type='text'
          placeholder='search ...'
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        {searchName !== "" && <button onClick={handleReset}>Reset</button>}
      </div>
      <div className='users'>
        {content}
      </div>
    </div>
  )
}

export default Search
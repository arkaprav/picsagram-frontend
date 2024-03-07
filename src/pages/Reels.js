import React, { useEffect, useState } from 'react'
import { useGetAllReelsQuery } from '../store'
import { GoSync } from 'react-icons/go';
import PostProfile from './PostProfile';

const Reels = () => {
  const { data: reels, isFetching } = useGetAllReelsQuery();
  const [content1, setContent1] = useState();
  const [content2, setContent2] = useState();
  const [content3, setContent3] = useState();
  const [content4, setContent4] = useState();
  const [fetching, setFetching] = useState();
  
  useEffect(() => {
    if(reels) {
      const c1 = reels.filter((_,i) => {
          return i%4 === 0;
      });
      const c2 = reels.filter((_,i) => {
          return i%4 === 1;
      });
      const c3 = reels.filter((_,i) => {
          return i%4 === 2;
      });
      const c4 = reels.filter((_,i) => {
          return i%4 === 3;
      });
      setContent1(c1.map((c) => {
          const today = new Date();
          const postDate = new Date(c.createdAt);
          let string;
          if(today.getFullYear() === postDate.getFullYear() && today.getMonth() === postDate.getMonth() && today.getDate() === postDate.getDate()){
              string = `${postDate.getHours()} : ${postDate.getMinutes()}`
          }
          else {
              string = `${postDate.getDate()}-${postDate.getMonth()}-${postDate.getFullYear()}`
          }
          let mute=true;
          let play = true;
          return <>
              <div className='single-post'>
                  <video
                    loop
                    muted={mute}
                    onMouseEnter={(e) => {e.target.play(); play = true;}}
                    onMouseLeave={(e) => {e.target.pause(); play = false;}}
                    onFocus={(e) => {e.target.play(); play = true;}}
                    onClick={(e) => {
                        if(play === true){
                            e.target.pause();
                            play = false;
                        }
                        else {
                            e.target.play();
                            play = true;
                        }
                    }}
                  >
                    <source src={c.video} type='video/mp4' width="100%" height="100%" />
                  </video>
                  <PostProfile id={c.createdBy} />
                  <p>
                      <div>
                          {c.caption}
                      </div>
                      <div>
                          {string}
                      </div>
                  </p>
              </div>
          </>
      }));
      setContent2(c2.map((c) => {
          const today = new Date();
          const postDate = new Date(c.createdAt);
          let string;
          if(today.getFullYear() === postDate.getFullYear() && today.getMonth() === postDate.getMonth() && today.getDate() === postDate.getDate()){
              string = `${postDate.getHours()} : ${postDate.getMinutes()}`
          }
          else {
              string = `${postDate.getDate()}-${postDate.getMonth()}-${postDate.getFullYear()}`
          }
          let mute=true;
          let play = true;
          return <>
              <div className='single-post'>
                  <video
                    loop
                    muted={mute}
                    onMouseEnter={(e) => {e.target.play(); play = true;}}
                    onMouseLeave={(e) => {e.target.pause(); play = false;}}
                    onFocus={(e) => {e.target.play(); play = true;}}
                    onClick={(e) => {
                        if(play === true){
                            e.target.pause();
                            play = false;
                        }
                        else {
                            e.target.play();
                            play = true;
                        }
                    }}
                  >
                    <source src={c.video} type='video/mp4' width="100%" height="100%" />
                  </video>
                  <PostProfile id={c.createdBy} />
                  <p>
                      <div>
                          {c.caption}
                      </div>
                      <div>
                          {string}
                      </div>
                  </p>
              </div>
          </>
      }));
      setContent3(c3.map((c) => {
          const today = new Date();
          const postDate = new Date(c.createdAt);
          let string;
          if(today.getFullYear() === postDate.getFullYear() && today.getMonth() === postDate.getMonth() && today.getDate() === postDate.getDate()){
              string = `${postDate.getHours()} : ${postDate.getMinutes()}`
          }
          else {
              string = `${postDate.getDate()}-${postDate.getMonth()}-${postDate.getFullYear()}`
          }
          let mute=true;
          let play = true;
          return <>
              <div className='single-post'>
                  <video
                    loop
                    muted={mute}
                    onMouseEnter={(e) => {e.target.play(); play = true;}}
                    onMouseLeave={(e) => {e.target.pause(); play = false;}}
                    onFocus={(e) => {e.target.play(); play = true;}}
                    onClick={(e) => {
                        if(play === true){
                            e.target.pause();
                            play = false;
                        }
                        else {
                            e.target.play();
                            play = true;
                        }
                    }}
                  >
                    <source src={c.video} type='video/mp4' width="100%" height="100%" />
                  </video>
                  <PostProfile id={c.createdBy} />
                  <p>
                      <div>
                          {c.caption}
                      </div>
                      <div>
                          {string}
                      </div>
                  </p>
              </div>
          </>
      }));
      setContent4(c4.map((c) => {
          const today = new Date();
          const postDate = new Date(c.createdAt);
          let string;
          if(today.getFullYear() === postDate.getFullYear() && today.getMonth() === postDate.getMonth() && today.getDate() === postDate.getDate()){
              string = `${postDate.getHours()} : ${postDate.getMinutes()}`
          }
          else {
              string = `${postDate.getDate()}-${postDate.getMonth()}-${postDate.getFullYear()}`
          }
          let mute=true;
          let play = true;
          return <>
              <div className='single-post'>
                  <video
                    loop
                    muted={mute}
                    onMouseEnter={(e) => {e.target.play(); play = true;}}
                    onMouseLeave={(e) => {e.target.pause(); play = false;}}
                    onFocus={(e) => {e.target.play(); play = true;}}
                    onClick={(e) => {
                        if(play === true){
                            e.target.pause();
                            play = false;
                        }
                        else {
                            e.target.play();
                            play = true;
                        }
                    }}
                  >
                    <source src={c.video} type='video/mp4' width="100%" height="100%" />
                  </video>
                  <PostProfile id={c.createdBy} />
                  <p>
                      <div>
                          {c.caption}
                      </div>
                      <div>
                          {string}
                      </div>
                  </p>
              </div>
          </>
      }));
      setFetching();
  }
  if(isFetching){
      setFetching(
          <div className='fetching'>
              <GoSync className='animate-spin' />
              <div className='cap'>Loading reels...</div>
          </div>
      )
  }
  }, [reels, isFetching]);
  return (
        <div className='all-posts'>
            <div className='single-post-col'>
                {content1}
            </div>
            <div className='single-post-col'>
                {content2}
            </div>
            <div className='single-post-col'>
                {content3}
            </div>
            <div className='single-post-col'>
                {content4}
            </div>
            {fetching}
        </div>
    )
}

export default Reels
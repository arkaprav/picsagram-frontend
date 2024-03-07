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
  const [content5, setContent5] = useState();
  const [fetching, setFetching] = useState();
  
  useEffect(() => {
    if(reels) {
      const c1 = reels.filter((_,i) => {
          return i%5 === 0;
      });
      const c2 = reels.filter((_,i) => {
          return i%5 === 1;
      });
      const c3 = reels.filter((_,i) => {
          return i%5 === 2;
      });
      const c4 = reels.filter((_,i) => {
          return i%5 === 3;
      });
      const c5 = reels.filter((_,i) => {
          return i%5 === 4;
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
          return <>
              <div className='single-post'>
                  <video
                    loop
                    muted={mute}
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => e.target.pause()}
                    onFocus={(e) => e.target.play()}
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
          let mute = true;
          return <>
              <div className='single-post'>
                  <video
                    loop
                    muted={mute}
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => e.target.pause()}
                    onFocus={(e) => e.target.play()}
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
          let mute = true;
          return <>
              <div className='single-post'>
                  <video
                    loop
                    muted={mute}
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => e.target.pause()}
                    onFocus={(e) => e.target.play()}
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
          let mute = true;
          return <>
              <div className='single-post'>
                  <video
                    loop
                    muted={mute}
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => e.target.pause()}
                    onFocus={(e) => e.target.play()}
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
      setContent5(c5.map((c) => {
          const today = new Date();
          const postDate = new Date(c.createdAt);
          let string;
          if(today.getFullYear() === postDate.getFullYear() && today.getMonth() === postDate.getMonth() && today.getDate() === postDate.getDate()){
              string = `${postDate.getHours()} : ${postDate.getMinutes()}`
          }
          else {
              string = `${postDate.getDate()}-${postDate.getMonth()}-${postDate.getFullYear()}`
          }
          let mute = true;
          return <>
              <div className='single-post'>
                  <video
                    loop
                    muted={mute}
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => e.target.pause()}
                    onFocus={(e) => e.target.play()}
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
            <div className='single-post-col'>
                {content5}
            </div>
            {fetching}
        </div>
    )
}

export default Reels
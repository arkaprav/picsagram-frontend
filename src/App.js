import { Route } from 'react-router-dom';
import './App.css';
import CustomeRoutes from './components/CustomeRoutes';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
import MenuBar from './components/MenuBar';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import EditProfile from './pages/EditProfile';
import SinglePostPage from './pages/SinglePostPage';
import Posts from './pages/Posts';
import UserPosts from './pages/UserPosts';
import UserSaved from './pages/UserSaved';
import Search from './pages/Search';
import SingleUserProfile from './pages/SingleusersProfile';
import SingleUsersSavedposts from './pages/SingleUsersSavedposts';
import SingleUsersPosts from './pages/SingleUsersPosts';
import Reels from './pages/Reels';

function App() {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <LoadingBar
        color='linear-gradient(to right, red, blue, green, yellow)'
        height={4}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <CustomeRoutes setProgress={setProgress}>
        <Route path='/' element={<MenuBar setProgress={setProgress} />}>
          <Route index element={<Posts setProgress={setProgress} />} />
          <Route path='search' element={<Search />} />
          <Route path='reels' element={<Reels setProgress={setProgress} />} />
          <Route path='login' element={<LogIn setProgress={setProgress} />} />
          <Route path='signup' element={<SignUp setProgress={setProgress} />} />
          <Route path='profile' element={<Profile />}>
            <Route index element={<UserPosts />} />
            <Route path='saved' element={<UserSaved />} />
          </Route>
          <Route path='single-user/:id/profile' element={<SingleUserProfile setProgress={setProgress} />}>
            <Route index element={<SingleUsersPosts setProgress={setProgress} />} />
            <Route path="saved" element={<SingleUsersSavedposts setProgress={setProgress} />} />
          </Route>
          <Route path='create-post' element={<CreatePost setProgress={setProgress} />} />
          <Route path='edit-profile' element={<EditProfile setProgress={setProgress} /> } />
          <Route path='post/:id' element={<SinglePostPage setProgress={setProgress} /> } />
        </Route>
      </CustomeRoutes>
    </>
  );
}

export default App;

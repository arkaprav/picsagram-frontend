import { Route } from 'react-router-dom';
import './App.css';
import CustomeRoutes from './components/CustomeRoutes';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
import MenuBar from './components/MenuBar';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';

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
          <Route index element={<div>Home...</div>} />
          <Route path='search' element={<div>Search...</div>} />
          <Route path='message' element={<div>Message...</div>} />
          <Route path='login' element={<LogIn setProgress={setProgress} />} />
          <Route path='signup' element={<SignUp setProgress={setProgress} />} />
        </Route>
      </CustomeRoutes>
    </>
  );
}

export default App;

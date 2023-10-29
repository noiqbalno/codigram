import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Home from './features/Home/components/home';
import Profile from './features/Profile/components/Profile';
import Layout from './features/Layout/components/Layout';
import Explore from './features/Explore/components/Explore';
import PostCreate from './features/Post/Components/PostCreate';
import Login from './features/Login/components/Login';
import Register from './features/Register/components/Register';
import Error from './features/Error/components/Error';
import ProtectedRoutes from './features/Login/components/ProtectedRoutes';
import Logout from './features/Login/components/Logout';
import PostUpdate from './features/Post/Components/PostUpdate';
import Help from './features/Layout/components/Help';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoutes>
                <Explore />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoutes>
                <PostCreate />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/post/update/:id"
            element={
              <ProtectedRoutes>
                <PostUpdate />
              </ProtectedRoutes>
            }
          />
          <Route path="/help" element={<Help />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

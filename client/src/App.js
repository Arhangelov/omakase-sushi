import { useContext } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { Context } from './store/UserContext';
import { logoutService } from './services/userAuth.service';
import { toastErrorHandler } from './utils/toastErrorHandling';

//Pages for routing
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import TypeOfSushi from './components/TypeOfSushi/TypeOfSushi';
import './App.css';

function App() {
  const [user, setUser] = useContext(Context);
  const navigate = useNavigate();

  const onLogoutHandler = (e) => {
    e.preventDefault();
    logoutService()
      .then((res) => {
        localStorage.clear();
        setUser({ email: '', username: '', address: '' });
        toast.success(`${res.message}`);
        navigate('/');
      })
      .catch((err) => {
        toastErrorHandler(err);
      });
  };
  return (
    <div className="App">
      <nav className="container-nav">
        <Link className="nav-logo" to="/">
          Logo
        </Link>
        <Link className="nav-menu" to="/menu">
          Menu
        </Link>
        {user.username ? (
          <>
            <Link onClick={onLogoutHandler} className="nav-logout">
              Logout
            </Link>
            <Link className="nav-profile" to="/profile">
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link className="nav-register" to="/register">
              Register
            </Link>
            <Link className="nav-login" to="/login">
              Login
            </Link>
          </>
        )}
        <Link className="nav-cart" to="/cart">
          Cart
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:type" element={<TypeOfSushi />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;

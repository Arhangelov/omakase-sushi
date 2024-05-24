import { useContext, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { Context } from './store/UserContext';
import { useCart } from './store/CartContext';
import { useCartQty } from './store/CartQtyContext';
import { logoutService } from './services/userAuthService';
import { toastErrorHandler } from './utils/toastErrorHandling';
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";

//Pages for routing
import Home from './components/Home/Home';
import About from './components/About/About';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Contact from './components/Contact/Contact';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import TypeOfSushi from './components/TypeOfSushi/TypeOfSushi';
import Details from './components/Details/Details';
import FinishedOrder from './components/FinishedOrder/FinishedOrder';

import './App.css';
import { getCartService } from './services/cartService';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [ cart, setCart] = useCart();
  const [ cartQty, setCartQty] = useCartQty();
  const [ user, setUser ] = useContext(Context);
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

  useEffect(() => {
    if (user.email) {
      getCartService(user.email)
        .then((cart) => {
          setCart(cart.products);
          setCartQty(cart.sumQty);
        })
    }
  }, [user.email, setCart, setCartQty])

  return (
    <div className="App">
      <header className='container-header'>
        <h1><Link className='nav-logo' to="/">Omakase</Link></h1>
        <nav className="container-nav">
          <ul className='nav-list'>
            <li>
              <Link className="nav-home" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-about" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="nav-contact" to="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="nav-menu" to="/menu/all">
                Menu
              </Link>
            </li>

          </ul>
        </nav>
            <nav className="nav-left">
              <ul>
            {user.username ? (
              <>
                <li>
                  <Link onClick={onLogoutHandler} className="nav-logout">
                    Logout
                  </Link>
                </li>

                <li>
                  <Link className="nav-profile" to="/profile">
                    <CgProfile />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="nav-register" to="/register">
                    Register
                  </Link>
                </li>

                <li>
                  <Link className="nav-login" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
                <li>
                  <Link className="nav-cart" to="/cart">
                    <IoCartOutline />
                    {cartQty !== 0 & user.email !== "" ? (
                      <div className='cart-indicator'>
                        <p>{cartQty}</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </Link>
                </li>
              </ul>
            </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:type" element={<TypeOfSushi />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/menu/details/:productId" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/finished-order' element={<FinishedOrder/>} />
      </Routes>


      <footer className="footer-container">
                <div className="nav-subscribe-container">
                    <div className="logo-nav-container">
                        <h2>Omakase</h2>
                        <div className="footer-navigation">
                            <Link to={"/about"}>About Us</Link>
                            <Link to={"/menu/all"}>Menu</Link>
                            <Link to={"/reservation"}>Reservations</Link>
                            <Link to={"/contact"}>Contact Us</Link>
                            <Link to={"/menu/all"}>Order Online</Link>
                        </div>
                    </div>
                    <div className="subscribe-container">
                        <div className='subscribe'>
                            <label htmlFor="email">Subscribe</label>
                            <div>
                                <input type="email" placeholder="Enter email address"/>
                                <button className='subscribe-btn'>Subscribe</button>
                            </div>
                        </div>
                        <p>By subscribing, you agree to our Privacy Policy.</p>
                    </div>
                </div>

                <div className="policy-rights-container">
                    <div className="policy-container">
                        <Link to={"/policy"}>Privacy Policy</Link>
                        <Link to={"/terms"}>Terms of Service</Link>
                        <Link to={"/cookie"}>Cookie Policy</Link>
                    </div>
                    <div className="rigths-container">
                        <p>&copy; 2023 Omakase Sushi. All rights reserved.</p>
                    </div>
                </div>
            </footer>
    </div>
  );
}

export default App;

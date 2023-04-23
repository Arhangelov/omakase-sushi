import { useContext } from 'react';
import './App.css';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Context } from "./store/UserContext";
import { logoutService } from './services/userAuth.service';
import { toast } from 'react-hot-toast';
import { toastErrorHandler } from './utils/toastErrorHandling';
//Pages for routing
import Home from './components/Home/Home';
import Register from './components/Register/Register';

function App() {
    const [user, setUser] = useContext(Context);
    const navigate = useNavigate();

    const onLogoutHandler = (e) => {
        e.preventDefault();
        logoutService()
        .then(res => {
            localStorage.clear();
            toast.success(`${res.message}`);
            navigate("/");
        }).catch(err => {
            toastErrorHandler(err);
        })
    }
    return (
        <div className="App">
            <nav className='container-nav'>
                {user.username ? (
                    <Link onClick={onLogoutHandler} className='nav-logout'>Logout</Link>
                ) : (
                    <>
                        <Link className='nav-logo' to='/'>Logo</Link>
                        <Link  className='nav-register' to='/register'>Register</Link>
                        <Link  className='nav-login' to='/login'>Login</Link>
                    </>
                )}
            </nav>

            <Routes>
                <Route path='/' element={ <Home /> }/>
                <Route path='/register' element={ <Register /> }/>
            </Routes>
        </div>
    );
}

export default App;

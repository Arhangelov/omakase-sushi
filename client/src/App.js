import { useContext } from 'react';
import './App.css';
import { Link, Route, Routes } from "react-router-dom";
import { Context } from "./store/UserContext";
//Pages for routing
import Home from './components/Home/Home';
import Register from './components/Register/Register';

function App() {
    const [user, setUser] = useContext(Context);
    return (
        <div className="App">
            <nav className='container-nav'>
                {user.username ? (
                    <Link className='nav-logout'>Logout</Link>
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

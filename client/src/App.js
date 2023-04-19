import './App.css';
import { Route, Routes } from "react-router-dom";
//Pages for routing
import Home from './components/Home/Home'

function App() {
    return (
        <div className="App">
            <h1>Hello from Omakase App</h1>
            <Routes>
                <Route path='/' element={ <Home /> }/>
            </Routes>
        </div>
    );
}

export default App;

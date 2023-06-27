import React from 'react';
import { Link } from 'react-router-dom';
import "./Menu.css";

const Menu = () => {

    return (
        <>
            <h2>Menu Page</h2>
            <section className='container-menu'>
                <Link to="/menu/set" >Set</Link>
                <Link to="/menu/futomaki" >Futomaki</Link>
                <Link to="/menu/uramaki" >Uramaki</Link>
                <Link to="/menu/sashimi" >Sashimi</Link>
                <Link to="/menu/hosomaki" >Hosomaki</Link>
                <Link to="/menu/nigiri" >Nigiri</Link>
            </section>
        </>
    )
}

export default Menu
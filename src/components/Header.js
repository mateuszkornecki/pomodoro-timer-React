import React from 'react';
import UserGreetings from "./UserGreetings";

function Header({ onLogout }) {

    return (
        <>
            <header className="header">
                <UserGreetings />
                <br />
                <a className="header__logout-link" onClick={onLogout} href="#">
                    Wyloguj
                           </a>
            </header>
        </>
    )
}

export default Header;
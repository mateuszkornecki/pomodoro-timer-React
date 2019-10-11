import React from 'react';
import UserGreetings from "./UserGreetings";

function Header({ accessToken, onLogout }) {

    return (
        <>
            <header className="header">
                <UserGreetings accessToken={accessToken} />
                <br />
                <a className="header__logout-link" onClick={onLogout} href="#">
                    Wyloguj
                           </a>
            </header>
        </>
    )
}

export default Header;
import React from 'react';
import UserGreetings from "./UserGreetings";
import AuthenticationContext from "../context/AuthenticationContext";

function Header() {

    return (
        <>
            <header className="header">
                <UserGreetings />
                <br />
                <AuthenticationContext.Consumer>
                    {
                        ({ onLogout }) => (
                            <a className="header__logout-link" onClick={onLogout} href="#">
                                Wyloguj
                            </a>
                        )
                    }
                </AuthenticationContext.Consumer>
            </header>
        </>
    )
}

export default Header;
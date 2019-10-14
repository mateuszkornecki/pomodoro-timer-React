import React from 'react';
import jwt from "jsonwebtoken";
import AuthenticationContext from "../context/AuthenticationContext";


function UserGreetings(props) {
    return (

        <AuthenticationContext.Consumer>
            {
                ({ accessToken }) => <>Witaj {getUserEmail(accessToken)}</>
            }
        </AuthenticationContext.Consumer>

    )
}

export default UserGreetings;

const getUserEmail = (accessToken) => {
    const decodedToken = jwt.decode(accessToken)
    return decodedToken.email;
}
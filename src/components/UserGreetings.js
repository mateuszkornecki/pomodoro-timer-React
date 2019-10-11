import React from 'react';
import jwt from "jsonwebtoken";

const getUserEmail = (accessToken) => {
    const decodedToken = jwt.decode(accessToken)
    return decodedToken.email;
}

function UserGreetings({ accessToken }) {
    return `Witaj ${getUserEmail(accessToken)}`;
}

export default UserGreetings;
import React, { useContext } from 'react';
import jwt from "jsonwebtoken";
import AuthenticationContext from "../context/AuthenticationContext";

function UserGreetings() {

   const { accessToken } = useContext(AuthenticationContext);

   return <>Witaj {getUserEmail(accessToken)}</>;
}

export default UserGreetings;

const getUserEmail = (accessToken) => {
   const decodedToken = jwt.decode(accessToken)
   return decodedToken.email;
}
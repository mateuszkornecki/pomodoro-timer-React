
import React from 'react';

function ErrorMessage({ message, children, hasError }) {
    return (
        <div>{hasError ? <div className="ErrorMessage">{message}</div> : children}</div>
    )
}

export default ErrorMessage;

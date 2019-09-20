import React from "react";

class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { message, children, hasError } = this.props;
        return (
            hasError ? message : children
        )
    }
}

export default ErrorMessage;
import React from "react";
import ErrorMessage from "./ErrorMessage";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log("%c wystąpił następujący błąd", "color: red", error, errorInfo);
    }

    render() {
        const { message, children } = this.props;
        return (
            // this.state.hasError ? message : children
            <ErrorMessage hasError={this.state.hasError} message={message}>{children}</ErrorMessage>
        )
    }
}

export default ErrorBoundary;
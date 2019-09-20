import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    render() {
        const { message, children } = this.props;
        return (
            this.state.hasError ? message : children
        )
    }
}

export default ErrorBoundary;
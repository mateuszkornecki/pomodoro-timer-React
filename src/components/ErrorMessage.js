
function ErrorMessage({ message, children, hasError }) {
    return (
        hasError ? message : children
    )
}

export default ErrorMessage;

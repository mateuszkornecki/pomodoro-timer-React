import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.loginForm = React.createRef();
    }

    handleSubmit = e => {
        const { onLoginAttempt } = this.props;
        e.preventDefault();
        onLoginAttempt({
            email: this.loginForm.current.children.emailInput.value,
            password: this.loginForm.current.children.passwordInput.value
        });
        this.loginForm.current.children.emailInput.value = "";
        this.loginForm.current.children.passwordInput.value = "";
    };

    render() {
        return (
            <form
                ref={this.loginForm}
                onSubmit={this.handleSubmit}
                className="LoginForm"
            >
                {this.props.errorMessage ?
                    <div className="LoginForm__error-message">
                        {this.props.errorMessage}
                    </div>
                    : ""
                }
                <label htmlFor="emailInputt">Email: </label>
                <input id="emailInput" type="email" />
                <br />
                <label htmlFor="passwordInput">Password: </label>
                <input id="passwordInput" type="password" />
                <br />
                <button>Zaloguj</button>
            </form>
        );
    }
}

export default LoginForm;

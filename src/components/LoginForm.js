import React, { useRef } from "react";

function LoginForm(props) {

   const loginForm = useRef();

   const handleSubmit = e => {
      const { onLoginAttempt } = props;
      e.preventDefault();
      onLoginAttempt({
         email: loginForm.current.children.emailInput.value,
         password: loginForm.current.children.passwordInput.value
      });
      loginForm.current.children.emailInput.value = "";
      loginForm.current.children.passwordInput.value = "";
   };

   return (
      <form
         ref={loginForm}
         onSubmit={handleSubmit}
         className="LoginForm"
      >
         {props.errorMessage ?
            <div className="LoginForm__error-message">
               {props.errorMessage}
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

export default LoginForm;

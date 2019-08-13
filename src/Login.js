import React from "react";
import employeeContainer from "./EmployeeContainer";

class Login extends React.Component {

    state = {
        username: "",
        password: "",
        isLoggedIn: false
    }

    render(){
        return (
            <div>
                <h4>Log In</h4>
                <form action="users/login" method="POST">
                    <input type="text" name="username" placeholder="Username" />
                    <br/>
                    <input type="password" name="password" placeholder="Password" />
                    <br/>
                    <button type="submit">
                        Log In
                    </button>
                </form>
            </div>
        )
    }
};

export default Login;
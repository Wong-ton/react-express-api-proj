import React from "react";
import { withRouter } from "react-router";

class Register extends React.Component {

    state = {
        username: "",
        password: "",
        isAdmin: false
    }

    changeHandler = this.changeHandler.bind(this);

    changeHandler(event){
        const { name, type, value, checked } = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
    }

    submitHandler = async (event) => {
        event.preventDefault();
        const register = await fetch("http://localhost:9000/auth/register", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedRegister = await register.json();
        console.log(parsedRegister, "response from register");

        if(parsedRegister.status.message === "User Logged In"){
            console.log("Logged In")

            this.props.history.push("/employees")
        }
    }

    render(){
        return(
            <form onSubmit={this.submitHandler}>
                <label>Username: 
                    <input 
                        type="text" 
                        name="username"
                        value={this.state.username}
                        placeholder="Enter Username" 
                        onChange={this.changeHandler} 
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        placeholder="Enter Password"
                        onChange={this.changeHandler} 
                    />
                </label>
                <label>
                    Admin:
                    <input
                        type="checkbox"
                        name="isAdmin"
                        checked={this.state.isAdmin}
                        onChange={this.changeHandler}
                    />
                </label>
                <button 
                    type="submit">
                        Register
                </button>
            </form>
        )
    }
}

export default withRouter(Register);
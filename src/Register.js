import React from "react";

class Register extends React.Component {

    state = {
        username: "",
        password: "",
        admin: false
    }

    changeHandler(event){
        
        const { name, type, value, checked } = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
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
                        name="admin"
                        checked={this.state.admin}
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

export default Register;
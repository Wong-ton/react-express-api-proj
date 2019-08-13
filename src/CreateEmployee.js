import React from 'react';

class CreateEmployee extends React.Component {
    
    state = {
        name: "",
        position: "",
        birthDate: "",
        department: "",
        annualSalary: ""
    }

    changeHandler = this.changeHandler.bind(this);

    changeHandler(event){
        const { name, value } = event.currentTarget
        this.setState({ [name]: value })
    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.addEmployee(this.state)
    }
    render() {
        return(
            <form onSubmit={this.submitHandler}>
                <h4>Add An Employee</h4>
                <br/>
                <input 
                    type="text" 
                    name="name"
                    value={this.state.name} 
                    onChange={this.changeHandler}
                    placeholder="Name"
                />
                <br/>
                <input 
                    type="text" 
                    name="position"
                    value={this.state.position} 
                    onChange={this.changeHandler}
                    placeholder="Position"
                />
                <br/>
                <input 
                    type="text" 
                    name="birthDate"
                    value={this.state.birthDate} 
                    onChange={this.changeHandler}
                    placeholder="Birth Date"
                />
                <br/>
                <input 
                    type="text" 
                    name="department"
                    value={this.state.department} 
                    onChange={this.changeHandler}
                    placeholder="Department"
                />
                <br/>
                <input 
                    type="text" 
                    name="annualSalary"
                    value={this.state.annualSalary} 
                    onChange={this.changeHandler}
                    placeholder="Annual Salary"
                />
                <br/>
                <button type="submit">
                    Submit
                </button>
            </form>
        )
    }
}

export default CreateEmployee;
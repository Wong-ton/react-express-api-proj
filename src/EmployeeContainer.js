import React, { Component } from "react";
import CreateEmployee from "./CreateEmployee";
import Employees from "./EmployeeList";
// import EditMovie from "../EditMovie";

class employeeContainer extends Component {
  
    state = {
      employees: [],
      showEditModal: false,
      employeeToEdit: {
        _id: null,
        title: "",
        description: ""
      }
    }

  componentDidMount(){
    this.getEmployees();
  }

  addEmployee = async (employee) => {
    
    console.log(employee, "inside of addEmployee")
    
    try {
      const createEmployee = await fetch("http://localhost:9000/employees",{
        method: "POST",
        credentials: "include",
        body: JSON.stringify(employee),
        headers: {
          "Content-Type": "application/json" 
          //lets our server (express app) know the contents of request is json
        }
      })
      console.log(createEmployee, "<createEmployee fetch")
      if(createEmployee.status !== 200){
        // from the fetch request itself seeing if its a successful request
        throw Error("Resource not found")
      }
      const createEmployeeResponse = await createEmployee.json();
      console.log(createEmployeeResponse.data, " createEmployeeResponse");
      // we only want to add the employee to the employees array, if it has
      // its mongo id, and it should because thats what are express
      // api is sending back
      this.setState({
        employees: [...this.state.employees, createEmployeeResponse.data]
      })
    } catch(err) {
      console.log(err, " addEmployee");
      return err
    }
  }

  getEmployees = async () => {
    try {
      const resGetEmployees = await fetch("http://localhost:9000/employees", {
        credentials: "include",
        method: "GET"
      });
      console.log(resGetEmployees, " resGetEmployees")
      if(resGetEmployees.status !== 200){
        throw Error("404 from server");
      }
      // parse the json from a string into a js object we
      // can manipulate
      const employeesResponse = await resGetEmployees.json();
      console.log(employeesResponse, " employeesResponse <")
      this.setState({
        employees: [...employeesResponse.data]
      });
    } catch(err){
      console.log(err, " getEmployees errors");
      return err
    }
  }

  handleFormChange = (e) => {
    this.setState({
      employeeToEdit: {
        ...this.state.employeeToEdit, // spread the previous contents of
        // the object in the employee to edit
        // then use the computational properties to edit
        // the input you"re typing in
        [e.target.name]: e.target.value
      }
    })
  }
  showModal = (employee) => {
    console.log(employee, " employeeID in show Modal")
    this.setState({
      employeeToEdit: employee,
      showEditModal: !this.state.showEditModal
    })
  }
  closeAndEdit = async (e) => {
    e.preventDefault();
    try {
      const editRequest = await fetch("http://localhost:9000/api/v1/employees/" + this.state.movieToEdit._id, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(this.state.employeeToEdit),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if(editRequest.status !== 200){
        throw Error("editRequest not working")
      }
      const editResponse = await editRequest.json();
      const editedEmployeeArray = this.state.employees.map((employee) => {
        // remember map creates a brand new array
        if(employee._id === editResponse.data._id){
        // comparing every employee in the array, the
        // employee we edited
        // and if they match update the employee with response
        // data from the api
          employee = editResponse.data
        }
        return employee
      });
      this.setState({
        employees: editedEmployeeArray,
        showEditModal: false
      })
      console.log(editResponse, " editResponse");
    } catch(err){
      console.log(err, " error closeAndEdit");
      return err
    }
  }
  deleteEmployee = async (id) => {
    console.log(id, " delete employee ID")

    try {

      const deleteEmployee = await fetch("http://localhost:9000/employees/" + id, {
        method: "DELETE",
        credentials: "include"
      });

      if(deleteEmployee.status !== 200){
        throw Error("Something happened on delete")
      }

      // this object is the actual response from the api
      const deleteEmployeeJson = await deleteEmployee.json();

      this.setState({
        employees: this.state.employees.filter((employee) => employee._id !== id)
      })

    } catch(err){
      console.log(err);
      return err
    }
  }
  render(){
    console.log(this.state, "< state in render");
    return (
      <div className="employee-container">
        <CreateEmployee addEmployee={this.addEmployee} />
        <Employees employees={this.state.employees} showModal={this.showModal} deleteEmployee={this.deleteEmployee}/>
        {/* {this.state.showEditModal ? <EditEmployee closeAndEdit={this.closeAndEdit} employeeToEdit={this.state.employeeToEdit} handleFormChange={this.handleFormChange}/> : null} */}
      </div>
      )
  }
}

export default employeeContainer;
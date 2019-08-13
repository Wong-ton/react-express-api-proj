import React from "react";

const Employees = (props) => {
    console.log(props, ' props in employeeList');

    const employeeList = props.employees.map((employee) => {
        return(
            <li key={employee._id}>
                <span>{employee.name}</span><br/>
                <span>{employee.position}</span><br/>
                <span>{employee.birthDate}</span><br/>
                <span>{employee.department}</span><br/>
                <span>{employee.annualSalary}</span><br/>
            </li>
        )

    })

    return(
        <div>
            <h2>Employees</h2>
            <ul>
                {employeeList}
            </ul>
        </div>
    )
}

export default Employees;
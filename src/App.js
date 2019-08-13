import React from "react";
import Login from "./Login";
import Register from "./Register";
import EmployeeContainer from "./EmployeeContainer"
import './App.css';

function App() {
  return (
    <div className="App">
      <h1></h1>
      <Register />
      <br/>
      <Login />
      <EmployeeContainer />
    </div>
  );
}

export default App;

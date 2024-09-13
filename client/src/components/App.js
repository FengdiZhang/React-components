import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ToDoList from "./ToDoList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/todolist" element={<ToDoList />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;

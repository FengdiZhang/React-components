import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
const ToDoList = () => {
  const [toDo, setToDo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [idCounter, setIdCounter] = useState(1);
  useEffect(() => {
    const fetchData = () => {
      const fakeData = [
        { id: 1, title: "Buy groceries", completed: false },
        { id: 2, title: "Clean the house", completed: true },
        { id: 3, title: "Finish React project", completed: false },
      ];
      setToDo(fakeData);
      setIdCounter(fakeData.length + 1);
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      const newToDo = {
        id: idCounter,
        title: inputValue,
        completed: false,
      };
      setToDo((prevToDo) => [...prevToDo, newToDo]);
      setIdCounter(idCounter + 1);
      setInputValue("");
    }
  };
  const handleDelete = (id) => {
    const updateToDo = toDo.filter((item) => item.id !== id);
    const reorderToDo = updateToDo.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    setToDo(reorderToDo);
    setIdCounter(reorderToDo.length + 1);
  };
  const handleCheckToDo = (id) => {
    const updateToDo = toDo.map((item) => {
      return item.id === id ? { ...item, completed: !item.completed } : item;
    });
    setToDo(updateToDo);
  };

  return (
    <Wrapper>
      <h1>To-Do List</h1>
      <InputWrapper>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="add new task"
        />
        <Button onClick={handleSubmit}>+</Button>
      </InputWrapper>
      <ul>
        {toDo.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleCheckToDo(item.id)}
            />
            {item.id} {item.title}
            {item.completed ? "✅" : "❌"}
            <Button
              onClick={() => {
                handleDelete(item.id);
              }}
            >
              -
            </Button>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};
const Wrapper = styled.div``;
const InputWrapper = styled.div``;
const Button = styled.button``;
export default ToDoList;

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
        <TextInput
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="add new task"
        />
        <Button onClick={handleSubmit}>Add</Button>
      </InputWrapper>
      <List>
        {toDo.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleCheckToDo(item.id)}
            />
            {item.id}. {item.title}
            &nbsp;&nbsp;
            {item.completed ? "✅" : "❌"}
            &nbsp;&nbsp;
            <Button
              onClick={() => {
                handleDelete(item.id);
              }}
            >
              Delete
            </Button>
          </li>
        ))}
      </List>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 50%;
  margin: auto;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const TextInput = styled.input`
  width: 400px;
  padding: 5px;
  margin-right: 10px;
  border-radius: 10px;
`;
const Button = styled.button`
  padding: 5px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
`;
const List = styled.ul`
  list-style: none;
  li {
    margin-bottom: 10px;
  }
  input {
    margin-right: 10px;
  }
`;
export default ToDoList;

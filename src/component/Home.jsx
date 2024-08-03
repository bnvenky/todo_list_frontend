/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup, Button, Row, Col } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { BsCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';
import Create from './Create';

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    axios.get('http://localhost:3001/get', {
      headers: { Authorization: token }
    })
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios.put(`http://localhost:3001/update/${id}`, null, {
      headers: { Authorization: localStorage.getItem('token') }
    })
      .then(result => {
        setTodos(todos.map(todo =>
          todo._id === id ? { ...todo, done: !todo.done } : todo
        ));
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  const handleTaskAdd = (newTask) => {
    setTodos([...todos, newTask]);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <Container className="p-4">
      {/* First Row: Logo and Logout Button */}
      <Row className="mb-4 d-flex align-items-center">
        <Col xs="auto">
          <h1 className="mb-4">Logo</h1>
        </Col>
        <Col className="text-center">
          {/* This column is empty but ensures spacing */}
        </Col>
        <Col xs="auto" className="text-right">
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      {/* Second Row: Todo List Title */}
      <Row className="mb-4">
        <Col className="text-center">
          <h1 className="mb-4">Todo List</h1>
        </Col>
      </Row>

      {/* Create Component */}
      <Create onTaskAdd={handleTaskAdd} />

      {/* Todo List Items */}
      {todos.length === 0 ? (
        <div className="mt-5 text-center">
          <h2>No Record</h2>
        </div>
      ) : (
        <ListGroup className="mt-3 w-50 mx-auto">
          {todos.map(todo => (
            <ListGroup.Item key={todo._id} className="d-flex justify-content-between align-items-center">
              <Row className="align-items-center w-100">
                <Col xs="auto" className="d-flex align-items-center">
                  <div onClick={() => handleEdit(todo._id)} className="d-flex align-items-center cursor-pointer">
                    {todo.done ? 
                      <BsFillCheckCircleFill className="mr-2 text-success" /> 
                      : <BsCircleFill className="mr-2 text-primary" />
                    }
                    <span className={todo.done ? "line-through" : ""}>{todo.task}</span>
                  </div>
                </Col>
              </Row>
              <Button
                variant="danger"
                onClick={() => handleDelete(todo._id)}
              >
                <FaTrash />
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default Home;







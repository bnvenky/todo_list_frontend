/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

function Create({ onTaskAdd }) {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:3001/add', { task }, {
      headers: { Authorization: token }
    })
      .then(res => {
        // Notify the parent component about the new task
        if (onTaskAdd) {
          onTaskAdd(res.data); // Pass the new task data to the parent
        }
        setTask(''); // Clear the input field
      })
      .catch(err => console.log(err));
  }

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Form className="d-flex align-items-center">
        <Form.Group as={Row} className="mb-0">
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Enter Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="mr-2"
            />
          </Col>
          <Col xs="auto">
            <Button
              variant="primary"
              onClick={handleAdd}
            >
              Add
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Create;

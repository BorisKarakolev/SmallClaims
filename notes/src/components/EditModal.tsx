import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { Show } from "../types/Types";

const EditModal = ({ show, handleClose, row }: Show) => {
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const onSubmitHandle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name && !content) return;

    axios
      .put(
        `http://localhost:4200/notes/${row.values?.id}`,
        {
          name: name,
          content: content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        handleClose()
        return <Alert variant="success">Note has been updated</Alert>
      })
      .catch((err) => <Alert variant="danger">Can't update your note</Alert>);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitHandle}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={row.values?.name}
              onChange={(e) => setName((row.values.name = e.target.value))}
              required={true}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              value={row.values?.content}
              onChange={(e) =>
                setContent((row.values.content = e.target.value))
              }
              required={true}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;

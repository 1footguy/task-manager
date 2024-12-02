import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Modal4Update from "../Modal/Modal4Update";
import { deleteTask, updateTask } from "../../firebase/firestore";

export default function Task(props) {
  const [editFormVisible, setEditFormVisible] = useState(false);

  async function removeTask() {
    await deleteTask(props.task.id);
    props.listTasks();
  }

  async function edit(data) {
    await updateTask(props.task.id, data);
    setEditFormVisible(false);
    props.listTasks();
  }

  function choosenTask() {
      setEditFormVisible(true);
  }

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <Modal4Update
        toggleForm={() => setEditFormVisible(!editFormVisible)}
        show={editFormVisible}
        task={props.task}
        onHide={() => setEditFormVisible(false)}
        edit={edit}
      />
      <Card
        style={{
          display: "flex",
          width: "16rem",
          height: "16rem",
          flexWrap: "wrap",
        }}
        className="m-5"
      >
        <Card.Body className="d-flex flex-column justify-content-between">
        <input type="hidden" value={props.task.id} name="taskId" />
          <Card.Title>{props.task.title}</Card.Title>
          <Card.Text>{props.task.description}</Card.Text>
          <Card.Text>
            {props.task.status === "true" ?<span>Status: <em>Concluido</em></span> : <span>Status: <em>Em andamento</em></span>}
          </Card.Text>
          <div className="d-flex gap-3 justify-content-center">
            <Button variant="outline-success" onClick={choosenTask}> Editar </Button>
            <Button variant="danger" onClick={removeTask}> Excluir </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

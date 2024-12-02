import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { newTask } from "../firebase/firestore";

export default function MyModal(props) {
  const { handleSubmit, register, reset } = useForm();

  async function addTask(data) {
    await newTask(data);
    reset();
    props.refreshTasks();
    props.onHide();
  }

  return (
    
    <Modal {...props} centered>
      <Modal.Header
        style={{ backgroundColor: "#616161", border: "0" }}
        closeButton
      >
        <Modal.Title style={{ color: "whitesmoke" }}>Nova tarefa</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#505050" }}>
        <Form onSubmit={handleSubmit(addTask)} className="text-align-center">
          <Form.Group className="mb-3" controlId="title">
            <Form.Label className="text-white">Title</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              {...register("title")}
              style={{
                border: "none",
                backgroundColor: "#7676",
                color: "whitesmoke",
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label className="text-white">Description</Form.Label>
            <Form.Control
              type="text"
              {...register("description")}
              style={{
                border: "none",
                backgroundColor: "#7676",
                color: "whitesmoke",
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="status">
            <Form.Label className="text-white">Status</Form.Label>
            <Form.Control
              as="select"
              value={props.formVisible}
              {...register("status")}
              style={{
                border: "none",
                backgroundColor: "#7676",
                color: "#4d88b9",
              }}
            >
              <option value="false">Em andamento</option>
              <option value="true">Concluído</option>
            </Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-end gap-4">
            <Button type="submit" variant="success">
              Save
            </Button>
            <Button variant="danger" onClick={props.onHide}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

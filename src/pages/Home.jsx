import { useEffect, useState } from "react";
import { deleteTask, getTasks, updateTask } from "../firebase/firestore";
import { useAuth } from "../context/Auth";
import { Navigate } from "react-router-dom";
import { newTask } from "../firebase/firestore";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Modal4Update from "../components/Modal/Modal4Update";
import Task from "../components/Task/Task";
import { useForm } from "react-hook-form";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const { autenticado } = useAuth();
  const { reset } = useForm();

  if (!autenticado) return <Navigate to="/login" />; 

  async function addTask(data) {
    await newTask(data);
    listTasks();
    setFormVisible(false);
    reset();
  }

  async function listTasks() {
    const taskList = await getTasks();
    setTasks(taskList);
  }

  useEffect(() => {
    listTasks();
  }, []);

  return (
    <>
        <Header
        toggleForm={() => setFormVisible(!formVisible)}
        show={formVisible}
        addTask={addTask}
      />
      <main className="flex-grow-1 row g-0" style={{ paddingBottom: '8vh'}} >
        {tasks.map((task) => <Task task={task} key={task.id} listTasks={listTasks}  /> )}
      </main>
      <Footer />
    </>
  );
}

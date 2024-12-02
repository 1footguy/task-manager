import { useEffect, useState } from "react";
import { deleteTask, getTasks, updateTask } from "../firebase/firestore"
import { Button, Card } from "react-bootstrap";
import { useAuth } from "../context/Auth";
import { Navigate } from "react-router-dom";
import { newTask } from "../firebase/firestore";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";


export default function Home(){
    
    const { autenticado } = useAuth();

    if (!autenticado) return <Navigate to='/login' />

    const [tasks, setTasks] = useState([]);
    const [formVisible, setFormVisible] = useState(false);

    async function listTasks(){
        const taskList = await getTasks();
        setTasks(taskList);
    }

    async function removeTask(id){
        await deleteTask(id);
        listTasks();
    }

    async function editTask(id){
        const title = window.prompt("Digite o novo título:");
        const description = window.prompt("Digite o novo conteúdo:");
        const concluido = window.prompt("Digite o novo estado (0) para em andamento (1) para concluido:");

        if (title && concluido && description) {
            const status = concluido === '1'
            const data = {title, description, status}
            await updateTask(id, data);
            listTasks();
        }
    }

    useEffect(() => {
        listTasks();
    }, []);

    return(  
        <>
            <Header openForm={() => setFormVisible(!formVisible)} show={formVisible} onHide={() => setFormVisible(false)} refreshTasks={() => listTasks()} addTask={() => newTask(data)}/>
            <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">

                {tasks.map(task => {
                    return(
                            <Card style={{ width: '18rem' }} key={task.id} className="d-grid grid-cols-1 grid-cols-sm-2 grid-cols-md-3 grid-cols-lg-5 gap-3 m-3">
                                <Card.Body>
                                <Card.Title>{task.title}</Card.Title>
                                <Card.Text>{task.description}</Card.Text>
                                <Card.Text>{(task.status === true) ? 'Concluido' : 'Em andamento' }</Card.Text>
                                <div className="d-flex gap-3 justify-content-center">
                                <Button variant="outline-success" onClick={() => editTask(task.id)}>Editar</Button>
                                <Button variant="danger" onClick={() => removeTask(task.id)}>Excluir</Button>
                                </div>
                                </Card.Body>
                            </Card>
                    )
                })}
            </main>
            <Footer />
        </>
    )
}
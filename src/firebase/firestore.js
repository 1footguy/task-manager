import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import app from './firebase.config';

const db = getFirestore(app);

export async function newTask(data){
    const taskCollec = collection(db, "tasks")
    await addDoc(taskCollec, data);
}

export async function getTasks(){
    const taskCollec = collection(db, "tasks");
    const tasks = await getDocs(taskCollec);
    const listTask = [];
    tasks.forEach(doc => {
        const task = doc.data();
        task.id = doc.id;
        listTask.push(task);
    })
    return listTask;
}

export async function updateTask(id, data) {
    const users = collection(db, "tasks");
    const document = doc(users, id);
    await updateDoc(document, data );
  }

export async function deleteTask(id){
    await deleteDoc(doc(db, "tasks", id));
}
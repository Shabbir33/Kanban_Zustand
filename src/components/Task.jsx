import classNames from "classnames"
import "./Task.css"
import itemStore from "../stores/itemStore"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'


const Task = ({id}) => {

    const task = itemStore((store) => store.tasks.find((task) => task.id === id));

    const setDraggedTask = itemStore((store) => store.setDraggedTask);

    const deleteTask = itemStore((store) => store.deleteTask);


    return (
        <div className="task" draggable onDragStart={() => {setDraggedTask(task.id)}}>
            <div>{task.title}</div>
            <div className="bottomWrapper">
                <div className="deleteItem"><FontAwesomeIcon icon={faTrash} onClick={() => {deleteTask(task.id)}}/></div>
                <div className={classNames("status", task.state)}>{task.state}</div>
            </div>
        </div>
    );
}

export default Task
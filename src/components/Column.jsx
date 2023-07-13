import { useState } from "react"
import itemStore from "../stores/itemStore"
import "./Column.css"
import Task from "./Task"
import { shallow } from "zustand/shallow"
import classNames from "classnames"

const Column = ({ state }) => {
    const store = itemStore();

    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const [drop, setDrop] = useState(false)

    const tasks = itemStore((store) => store.tasks.filter(task => task.state === state),
        shallow
    );

    console.log(store.drop)

    const setDraggedTask = itemStore((store) => store.setDraggedTask);
    const draggedTask = itemStore((store) => store.draggedTask);
    const moveTask = itemStore((store) => store.moveTask);


    const addTask = itemStore((store) => store.addTask)

    const updateTextField = (event) => {
        const { value } = event.target
        setText(value)
    }


    return (
        <div className={classNames("column", {drop: drop})} 
            onDragOver={(event) => {
                    setDrop(true)
                    event.preventDefault()
                }
            }
            onDragLeave={(event) => {
                    event.preventDefault()
                    setDrop(false)
                }
            }
            onDrop={() => {
                    setDrop(false)
                    moveTask(draggedTask, state)
                    setDraggedTask(null)
                }
            }
        >
            <div className="titleWrapper">
                <p>{state}</p>
                <button
                    onClick={() => {
                        setOpen(true)
                    }}
                >Add</button>
            </div>
            {tasks.map((task) => (
                <Task title={task.title} key={task.id} id={task.id} />
            ))}
            {open && (<div className="Modal">
                <div className="modalContent">
                    <input onChange={updateTextField} value={text} />
                    <button onClick={() => {
                        addTask(text, state)
                        setText('')
                        setOpen(false)
                    }}>Submit</button>
                </div>
            </div>)}
        </div>
    );
}

export default Column
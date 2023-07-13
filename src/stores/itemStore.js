import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';

const itemStore = create((set) => ({
    tasks: [
        {
            id: uuidv4(),
            title: 'TestTask', 
            state: 'PLANNED'
        },
        {
            id: uuidv4(),
            title: 'TestTask 2', 
            state: 'PLANNED'
        }
    ],

    draggedTask: null,

    addTask: (title, state) => {
        const id = uuidv4()
        set((store) => ({ tasks: [...store.tasks, {id, title, state}]}))
    },

    deleteTask: (id) => {
        set((store) => ({ tasks: store.tasks.filter((task) => task.id !== id)}))
    },

    setDraggedTask: (id) => set({draggedTask: id}),

    moveTask: (id, state) => {
        set((store) => ({
            tasks: store.tasks.map(
                (task) => task.id === id ? {id, title: task.title, state} : task
            )
        }))
    },
}));

export default itemStore
import {defineStore} from "pinia";
import {ref} from "vue";
import { v4 as generateId } from 'uuid';
import task from "../components/Task.vue";

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export const useTasksStore = defineStore('tasksData', () => {
    let tasks = ref<Array<Task>>([]);

    const getTasks = async () => {
        try {
            const response = await fetch("https://67e90de9bdcaa2b7f5b8707c.mockapi.io/list/tasks");
            tasks.value = await response.json() as Task[];
        } catch (error) {
            console.log(error);
        }
    }

    const addTask = (title: string, description: string) => {
        const newTask = {
            id: generateId(),
            title: title,
            description: description,
            completed: false
        };
        tasks.value.unshift(newTask);
    }

    const removeTask = (id: string) => {
        tasks.value = tasks.value.filter(task => task.id !== id);
        console.log(tasks.value);
    }

    const changeCompleteTask = (id: string) => {
        const task = tasks.value.find(task => task.id === id);

        if (task) {
            task.completed = !task.completed;
        }
    }

    const updateTask = (id: string, title: string, description: string) => {
        const taskIndex = tasks.value.findIndex(t => t.id === id);

        if (taskIndex >= 0) {
            tasks.value[taskIndex] = {
                id: task.id,
                title: title,
                description: description,
                completed: task.completed,
            };
        }
    }

    return {tasks, getTasks, addTask,
        removeTask, changeCompleteTask, updateTask}
})
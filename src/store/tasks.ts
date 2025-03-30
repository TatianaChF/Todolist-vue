import {defineStore} from "pinia";
import {ref} from "vue";

export interface Task {
    id: number;
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

    const addTask = (task: Task) => {
        tasks.value.push(task);
    }

    return {tasks, getTasks, addTask}
})
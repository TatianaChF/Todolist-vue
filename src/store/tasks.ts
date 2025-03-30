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
            const response = await fetch("https://67e90de9bdcaa2b7f5b8707c.mockapi.io/list");
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return {tasks, getTasks}
})
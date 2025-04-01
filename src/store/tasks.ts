import {defineStore} from "pinia";
import {computed, ref, watch} from "vue";
import { v4 as generateId } from 'uuid';

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

type FilterType = 'all' | 'completed' | 'uncompleted';

export const LOCAL_STORAGE_KEY = "tasksStorage";

export const useTasksStore = defineStore('tasksData', () => {
    let tasks = ref<Array<Task>>([]);
    const currentFilter = ref<FilterType>('all');

    const loadFromLocalStorage = () => {
        const tasksLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (tasksLocalStorage) {
            try {
                tasks.value = JSON.parse(tasksLocalStorage);
            } catch (error) {
                console.error('Ошибка загрузки из localStorage:', error);
                localStorage.removeItem(LOCAL_STORAGE_KEY);
            }
        }
    };

    loadFromLocalStorage();

    // Автосохранение при изменении задач
    watch(
        tasks,
        (newTasks) => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
        },
        { deep: true }
    );

    const getTasks = async () => {
        if (tasks.value.length === 0) {
            try {
                const response = await fetch("https://67e90de9bdcaa2b7f5b8707c.mockapi.io/list/tasks");
                tasks.value = await response.json() as Task[];
            } catch (error) {
                console.log(error);
            }
        }
    }

    const addTask = (title: string, description: string) => {
        const newTask = {
            id: generateId(),
            title: title.trim(),
            description: description.trim(),
            completed: false
        };
        tasks.value = [newTask, ...tasks.value];
    }

    const removeTask = (id: string) => {
        tasks.value = tasks.value.filter(task => task.id !== id);
    }

    const changeCompleteTask = (id: string) => {
        tasks.value = tasks.value.map(task =>
            task.id === id
                ? { ...task, completed: !task.completed }
                : task
        );
    }

    const updateTask = (id: string, title: string, description: string) => {
        tasks.value = tasks.value.map(task =>
            task.id === id
                ? { ...task, title: title.trim(), description: description.trim() }
                : task
        );
    }

    const filteredTasks = computed(() => {
        const filter = currentFilter.value;
        const allTasks = tasks.value;

        switch(filter) {
            case 'completed':
                return tasks.value.filter(task => task.completed);
            case 'uncompleted':
                return tasks.value.filter(task => !task.completed);
            default:
                return [...allTasks];
        }
    });

    const setFilter = (filter: FilterType) => {
        currentFilter.value = filter;
        console.log(tasks.value);
    };

    return {tasks, getTasks, addTask,
        removeTask, changeCompleteTask, updateTask,
        currentFilter, filteredTasks, setFilter}
})
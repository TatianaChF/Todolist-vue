<template>
  <div class="container">
    <h1>ToDo-list</h1>
    <button @click="isOpenForm = true"
            class="btn-add-task">
      Добавить задачу
    </button>
    <TaskForm
        v-show="isOpenForm"
        @change-show-form="isOpenForm = false"/>
    <div v-if="uncompletedTasks.length">
      <h2>Текущие задачи</h2>
      <div
          v-for="task in uncompletedTasks"
          :key="task.id">
        <Task :taskData="task" />
      </div>
    </div>

    <div v-if="completedTasks.length">
      <h2>Выполненные задачи</h2>
      <div
          v-for="task in completedTasks"
          :key="task.id">
        <Task :taskData="task" />
      </div>
    </div>

    <div v-if="!tasksStore.tasks.length"
         class="empty-state">
      🎉 Пока нет задач! Добавьте первую задачу.
    </div>
  </div>
</template>

<script setup lang="ts">
import {useTasksStore} from "../store/tasks.ts";
import {computed, onBeforeMount, ref} from "vue";
import Task from "./Task.vue";
import TaskForm from "./TaskForm.vue";

const isOpenForm = ref<boolean>(false);
const tasksStore = useTasksStore();

defineEmits(["changeShowForm"]);

defineProps({
  taskData: Object
})

onBeforeMount(() => {
  tasksStore.getTasks();
})

const uncompletedTasks = computed(() =>
    tasksStore.tasks.filter(task => !task.completed)
);

const completedTasks = computed(() =>
    tasksStore.tasks.filter(task => task.completed)
);
</script>
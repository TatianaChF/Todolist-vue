<template>
  <p>ToDo-list</p>
  <button @click="isOpenForm = true">Добавить задачу</button>
  <TaskForm v-show="isOpenForm" />
  <div
      v-for="task in tasksStore.tasks"
      :key="task.id">
    <Task :taskData="task" />
  </div>
</template>

<script setup lang="ts">
import {useTasksStore} from "../store/tasks.ts";
import {onMounted, ref} from "vue";
import Task from "./Task.vue";
import TaskForm from "./TaskForm.vue";

const isOpenForm = ref(false);
const tasksStore = useTasksStore();

defineProps({
  taskData: Object
})

onMounted(() => {
  tasksStore.getTasks();
})
</script>
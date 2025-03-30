<template>
  <p>Страница задач</p>
  <div
      v-for="task in tasksStore.tasks"
      :key="task.id">
    <Task :taskData="task" />
  </div>
</template>

<script setup lang="ts">
import {useTasksStore} from "../store/tasks.ts";
import {onMounted} from "vue";
import Task from "./Task.vue";

const tasksStore = useTasksStore();

defineProps({
  taskData: Object
})

onMounted(() => {
  tasksStore.getTasks();
})
</script>
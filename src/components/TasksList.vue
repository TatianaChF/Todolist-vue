<template>
  <p>Страница задач</p>
  <div
      v-for="task in tasksStore.tasks"
      :key="task.id">
    <p>{{task.title}}</p>
  </div>
</template>

<script setup lang="ts">
import {useTasksStore} from "../store/tasks.ts";
import {onMounted} from "vue";

const tasksStore = useTasksStore();

onMounted(() => {
  tasksStore.getTasks();
  console.log(tasksStore.tasks);
})
</script>
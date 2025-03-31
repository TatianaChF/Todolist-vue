<template>
  <h1>ToDo-list</h1>
  <button @click="isOpenForm = true" class="btn-add-task">
    Добавить задачу
  </button>
  <TaskForm v-show="isOpenForm" @show-form="isOpenForm = false"/>
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

const isOpenForm = ref<boolean>(false);
const tasksStore = useTasksStore();

defineEmits(["showForm"]);

defineProps({
  taskData: Object
})

onMounted(() => {
  tasksStore.getTasks();
})
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 50px;
  color: #020235;
}

.btn-add-task {
  border-radius: 10px;
  color: white;
  font-size: 16px;
  transition: .2s linear;
  background: #0B63F6;
  padding: 15px 15px;
  border: none;
  cursor: pointer;
}

.btn-add-task:hover {
  box-shadow: 0 0 0 2px white, 0 0 0 4px #3C82F8;
}
</style>
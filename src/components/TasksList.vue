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
    <div
        v-for="task in tasksStore.tasks"
        :key="task.id">
      <Task :taskData="task" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useTasksStore} from "../store/tasks.ts";
import {onMounted, ref} from "vue";
import Task from "./Task.vue";
import TaskForm from "./TaskForm.vue";

const isOpenForm = ref<boolean>(false);
const tasksStore = useTasksStore();

defineEmits(["changeShowForm"]);

defineProps({
  taskData: Object
})

onMounted(() => {
  tasksStore.getTasks();
})
</script>
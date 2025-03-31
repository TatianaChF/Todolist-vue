<template>
  <div :class="changeStyles">
    <h1>ToDo-list</h1>
    <button @click="isOpenForm = true"
            class="btn-add-task">
      Добавить задачу
    </button>
    <div
        v-for="task in tasksStore.tasks"
        :key="task.id">
      <Task :taskData="task" />
    </div>
  </div>
  <TaskForm
      v-show="isOpenForm"
      @change-show-form="isOpenForm = false"/>
</template>

<script setup lang="ts">
import {useTasksStore} from "../store/tasks.ts";
import {computed, onMounted, ref} from "vue";
import Task from "./Task.vue";
import TaskForm from "./TaskForm.vue";

const isOpenForm = ref<boolean>(false);
const tasksStore = useTasksStore();

const changeStyles = computed(() => {
  return isOpenForm.value
      ? "container container-hidden-space"
      : "container";
});

defineEmits(["changeShowForm"]);

defineProps({
  taskData: Object
})

onMounted(() => {
  tasksStore.getTasks();
})
</script>
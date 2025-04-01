<template>
  <div
      class="task-card"
      :class="{ completed: props.taskData.completed }">
    <div class="task-header">
      <input
          type="checkbox"
          name="completed"
          :checked="props.taskData.completed"
          class="task-checkbox"
          @change="tasksStore.changeCompleteTask(props.taskData.id)" />
    </div>
    <div class="task-text">
      <h3 class="task-title">
        {{ props.taskData.title }}
      </h3>
      <p class="task-description">
        {{ props.taskData.description }}
      </p>
    </div>
    <div>
      <button
          @click="isOpenEditForm = true"
          class="change-btn">
        ✏️
      </button>
      <button
          @click="tasksStore.removeTask(props.taskData.id)"
          class="delete-btn">
        🗑️
      </button>
    </div>
  </div>
  <EditTaskForm
      v-show="isOpenEditForm"
      :task="taskData"
      @cancel-form="isOpenEditForm = false" />
</template>

<script setup lang="ts">
import {useTasksStore} from "../store/tasks.ts";
import EditTaskForm from "./Forms/EditTaskForm.vue";
import {ref} from "vue";

const isOpenEditForm = ref(false);
const props = defineProps(["taskData", "task"]);
const tasksStore = useTasksStore();
</script>
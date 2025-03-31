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
    <div>
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
import EditTaskForm from "./EditTaskForm.vue";
import {ref} from "vue";

const isOpenEditForm = ref(false);
const props = defineProps(["taskData", "task"]);
const tasksStore = useTasksStore();
</script>

<style scoped>
.task-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  margin-bottom: 1rem;
}

.task-card.completed {
  opacity: 0.7;
  background: #f8fafc;
}

.task-card.completed .task-title {
  text-decoration: line-through;
  color: #64748b;
}

.task-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.task-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
}

.task-title {
  margin: 0;
  flex-grow: 1;
  color: #1e293b;
}

.task-description {
  margin: 0.5rem 0;
  color: #475569;
  font-size: 0.9em;
}

.delete-btn,
.change-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.delete-btn:hover {
  opacity: 0.7;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
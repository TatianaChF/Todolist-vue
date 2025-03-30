<template>
  <div
      class="task-card"
      :class="{ completed: props.taskData.completed }">
    <div class="task-header">
      <input
          type="checkbox"
          name="completed"
          :checked="props.taskData.completed"
          class="task-checkbox" />
    </div>
    <h3 class="task-title">
      {{ props.taskData.title }}
    </h3>
    <p>{{ props.taskData.description }}</p>
    <button
        @click="tasksStore.removeTask(props.taskData.id)"
        class="delete-btn"
    >
      Удалить
    </button>
  </div>
</template>

<script setup lang="ts">
import {useTasksStore} from "../store/tasks.ts";

const props = defineProps(["taskData"]);
const tasksStore = useTasksStore();
</script>

<style scoped>
.task-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
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

.task-footer {
  margin-top: 0.5rem;
  color: #94a3b8;
  font-size: 0.8em;
}

.delete-btn {
  background: none;
  border: none;
  color: #dc2626;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0 0.5rem;
  transition: opacity 0.2s;
}

.delete-btn:hover {
  opacity: 0.7;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
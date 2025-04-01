<template>
  <div class="task-filter">
    <button
        @click="setFilter('all')"
        :class="{ active: currentFilter === 'all' }"
    >
      Все ({{ totalTasks }})
    </button>
    <button
        @click="setFilter('uncompleted')"
        :class="{ active: currentFilter === 'uncompleted' }"
    >
      Активные ({{ uncompletedCount }})
    </button>
    <button
        @click="setFilter('completed')"
        :class="{ active: currentFilter === 'completed' }"
    >
      Завершенные ({{ completedCount }})
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTasksStore } from "../store/tasks";
import { storeToRefs } from "pinia";
import {computed} from "vue";

const tasksStore = useTasksStore();
const { currentFilter, tasks } = storeToRefs(tasksStore);
const { setFilter } = tasksStore;

const totalTasks = computed(() => tasks.value.length);
const completedCount = computed(() =>
    tasks.value.filter(t => t.completed).length
);
const uncompletedCount = computed(() =>
    tasks.value.filter(t => !t.completed).length
);
</script>
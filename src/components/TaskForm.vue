<template>
  <div>
    <div>
      <label for="title">Название задачи</label>
      <input name="title" type="text" v-model="newTitle" />
    </div>
    <div>
      <label for="description">Описание</label>
      <textarea name="description" v-model="newDescription" />
    </div>
    <button @click="tasksStore.addTask(newTitle, newDescription)">
      Добавить
    </button>
  </div>
</template>

<script setup lang="ts">
import {useTasksStore} from "../store/tasks.ts";
import {ref} from "vue";

const newTitle = ref();
const newDescription = ref();
const tasksStore = useTasksStore();

</script>
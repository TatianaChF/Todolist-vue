<template>
  <div>
    <div>
      <label for="title">Название задачи</label>
      <input name="title"
             type="text"
             v-model="newTitle"
             placeholder="Введите заголовок" />
    </div>
    <div>
      <label for="description">Описание</label>
      <textarea
          name="description"
          v-model="newDescription"
          placeholder="Добавьте описание" />
    </div>
    <button @click="handleAddTask">
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

const handleAddTask = () => {
  tasksStore.addTask(newTitle.value, newDescription.value);
  newTitle.value = "";
  newDescription.value = "";
}
</script>
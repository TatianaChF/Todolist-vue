<template>
  <div class="form">
    <div class="form-group">
      <label for="title">Название задачи</label>
      <input name="title"
             type="text"
             v-model="newTitle"
             placeholder="Введите заголовок" />
    </div>
    <div class="form-group">
      <label for="description">Описание</label>
      <textarea
          name="description"
          v-model="newDescription"
          placeholder="Добавьте описание" />
    </div>
    <div class="form-btns">
      <button @click="$emit('changeShowForm')"
              class="btn-cancel">
        Отмена
      </button>
      <button @click="handleAddTask"
              class="btn-add-task">
        Добавить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useTasksStore} from "../store/tasks.ts";
import {ref} from "vue";

const newTitle = ref();
const newDescription = ref();
const tasksStore = useTasksStore();
const emits = defineEmits(["changeShowForm"]);

const handleAddTask = () => {
  tasksStore.addTask(newTitle.value, newDescription.value);
  newTitle.value = "";
  newDescription.value = "";
  emits("changeShowForm");
}
</script>

<style scoped>
.form {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 10px;
  background: #e4e5e8;
  padding: 40px;
  border-radius: 10px;
  border: 1px #475569;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.37);
  z-index: 1;
  top: 25%;
  left: 25%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-size: 18px;
}

input,
textarea {
  margin: 0;
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #bdbdbd;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-btns {
  display: flex;
  justify-content: space-between;
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
  background-color: rgba(11, 99, 246, 0.62);
  color: white;
}

.btn-cancel {
  border-radius: 10px;
  color: white;
  font-size: 16px;
  transition: .2s linear;
  background: #f60b5d;
  padding: 15px 15px;
  border: none;
  cursor: pointer;
}

.btn-cancel:hover {
  background-color: rgba(246, 11, 93, 0.62);
  color: white;
}
</style>
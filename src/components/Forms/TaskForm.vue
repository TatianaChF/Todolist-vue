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
              :class="changeBtnStyle"
              :disabled="isDisabled" >
        Добавить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useTasksStore} from "../../store/tasks.ts";
import {computed, ref} from "vue";

const newTitle = ref("");
const newDescription = ref("");
const tasksStore = useTasksStore();
const emits = defineEmits(["changeShowForm"]);

const handleAddTask = () => {
  tasksStore.addTask(newTitle.value, newDescription.value);
  newTitle.value = "";
  newDescription.value = "";
  emits("changeShowForm");
}

const isDisabled = computed(() => {
  return newTitle.value === "" || newDescription.value === "";
});

const changeBtnStyle = computed(() => {
  return newTitle.value === "" || newDescription.value === "" ? "btn-add-task-disabled" : "btn-add-task";
})
</script>
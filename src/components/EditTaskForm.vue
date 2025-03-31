<template>
  <form
      @submit.prevent="handleSubmit"
      class="form">
    <div class="form-group">
      <label>Название:</label>
      <input
          type="text"
          v-model.trim="form.title"
          required
          :disabled="isSubmitting"
      />
    </div>
    <div class="form-group">
      <label>Описание:</label>
      <textarea
          v-model.trim="form.description"
          :disabled="isSubmitting"
          rows="3"
      ></textarea>
    </div>
    <div class="form-btns">
      <button
          type="button"
          @click="$emit('cancelForm')"
          class="btn-cancel"
          :disabled="isSubmitting"
      >
        Отмена
      </button>
      <button
          type="submit"
          class="btn-add-task"
          :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Сохранение...' : 'Сохранить' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {useTasksStore} from "../store/tasks.ts";

const props = defineProps(["task"]);
const emits = defineEmits(["cancelForm"]);

const form = reactive({
  title: props.task.title,
  description: props.task.description
});
const isSubmitting = ref(false);
const tasksStore = useTasksStore();

const handleSubmit = async () => {
  if (!form.title.trim()) return;

  tasksStore.updateTask(props.task.id, form.title, form.description);
  emits('cancelForm');

  isSubmitting.value = true;
};
</script>
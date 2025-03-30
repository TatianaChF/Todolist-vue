<template>
  <form @submit.prevent="handleSubmit">
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
    <div class="form-actions">
      <button
          type="button"
          @click="$emit('cancel')"
          class="btn cancel-btn"
          :disabled="isSubmitting"
      >
        Отмена
      </button>
      <button
          type="submit"
          class="btn save-btn"
          :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Сохранение...' : 'Сохранить' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";

const props = defineProps(["task"]);

const form = reactive({
  title: props.task.title,
  description: props.task.description
});
const isSubmitting = ref(false);

const handleSubmit = async () => {
  if (!form.title.trim()) return;

  isSubmitting.value = true;
};
</script>
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
      >
        Отмена
      </button>
      <button
          type="submit"
          :class="changeBtnStyle"
          :disabled="isDisabled"
      >
        Сохранить
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {computed, reactive} from "vue";
import {useTasksStore} from "../../store/tasks.ts";

const props = defineProps(["task"]);
const emits = defineEmits(["cancelForm"]);

const form = reactive({
  title: props.task.title,
  description: props.task.description
});
const tasksStore = useTasksStore();

const handleSubmit = async () => {
  if (!form.title.trim()) return;

  tasksStore.updateTask(props.task.id, form.title, form.description);
  emits('cancelForm');
};

const isDisabled = computed(() => {
  return form.title === "" || form.description === "";
});

const changeBtnStyle = computed(() => {
  return form.title === "" || form.description === "" ? "btn-add-task-disabled" : "btn-add-task";
})
</script>
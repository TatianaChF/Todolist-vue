<template>
  <h3>{{ props.taskData.title }}</h3>
  <p>{{ props.taskData.description }}</p>
  <input type="checkbox" name="completed" />
</template>

<script setup lang="ts">
const props = defineProps(["taskData"]);
</script>
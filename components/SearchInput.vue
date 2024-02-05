<!-- components/SearchInput.vue -->

<template>
  <input
    :value="value"
    @input="$emit('update:value', $event)"
    :placeholder="placeholder"
    class="border p-2 mb-4"
  />
</template>

<script setup>
import { defineProps } from 'vue';

const { value, placeholder } = defineProps(['value', 'placeholder']);
</script>

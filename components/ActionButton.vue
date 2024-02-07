<!-- components/ActionButton.vue -->

<template>
    <button
      @click="onClick"
      class="bg-green-500 text-white px-4 py-2 rounded mb-4"
    >
      {{ label }}
    </button>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  
  const { onClick, label } = defineProps(["onClick", "label"]);
  </script>
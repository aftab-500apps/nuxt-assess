<!-- components/Form.vue -->

<template>
  <form @submit.prevent="submitForm" class="w-full max-w-md mx-auto">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2"
        >{{ formType }} Name:</label
      >
      <input
        v-model="formData.name"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">{{
        isEmployeeForm ? "Age:" : "Phone:"
      }}</label>
      <input
        v-if="isEmployeeForm"
        type="number"
        v-model="formData.age"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <input
        v-else
        type="tel"
        v-model="formData.phone"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">{{
        isEmployeeForm ? "Gender:" : "Country:"
      }}</label>
      <select
        v-model="formData.gender"
        v-if="isEmployeeForm"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <select
        v-else
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="USA">USA</option>
        <option value="Canada">Canada</option>
        <option value="UK">UK</option>
        <!-- Add more countries as needed -->
      </select>
    </div>

    <div class="mb-4" v-if="isEmployeeForm">
      <label class="block text-gray-700 text-sm font-bold mb-2"
        >Date of Joining:</label
      >
      <input
        type="date"
        v-model="formData.dateOfJoining"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div class="mb-4" v-if="isEmployeeForm">
      <label class="block text-gray-700 text-sm font-bold mb-2"
        >Designation:</label
      >
      <select
        v-model="formData.designation"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="Manager">Manager</option>
        <option value="Developer">Developer</option>
        <option value="Designer">Designer</option>
      </select>
    </div>

    <div class="flex items-center justify-between">
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {{ isEditing ? "Update" : "Add" }} {{ formType }}
      </button>
      <button
        type="button"
        @click="clearForm"
        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
const { formType, isEmployeeForm } = defineProps([
  "formType",
  "isEmployeeForm",
]);
const emit = defineEmits(['submit']);

let formData = ref({});
let isEditing = ref(false);

const clearForm = () => {
  formData.value = {};
  isEditing.value = false;
};

const submitForm = () => {
  // Emit an event to the parent component with the form data
  emit("submit", { ...formData.value, isEditing: isEditing.value });

  // Clear the form after submission
  clearForm();
};
</script>

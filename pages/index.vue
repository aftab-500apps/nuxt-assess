<!-- pages/employee-management.vue -->

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Employee Management System</h1>

    <!-- Search Input -->
    <SearchInput v-model="searchQuery" placeholder="Search by name" />

    <!-- Add Employee Button -->
    <ActionButton :onClick="toggleAddEmployeeModal" label="Add Employee" />

    <!-- Display Employees -->
    <div v-if="filteredEmployees.length > 0">
      <table class="w-full text-center border-collapse">
        <thead>
          <tr>
            <th class="border p-2">Name</th>
            <th class="border p-2">Age</th>
            <th class="border p-2">Gender</th>
            <th class="border p-2">Date of Joining</th>
            <th class="border p-2">Designation</th>
            <th class="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in filteredEmployees" :key="employee.id">
            <td class="border p-2">{{ employee.name }}</td>
            <td class="border p-2">{{ employee.age }}</td>
            <td class="border p-2">{{ employee.gender }}</td>
            <td class="border p-2">{{ employee.dateOfJoining }}</td>
            <td class="border p-2">{{ employee.designation }}</td>
            <td class="border p-2">
              <button
                @click="editEmployee(employee)"
                class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                @click="deleteEmployee(employee.id)"
                class="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Employee Modal -->
    <div v-if="showModal">
      <div class="modal-overlay" @click="toggleModal"></div>
      <div class="modal bg-white p-4 rounded">
        <Form
          :isEmployeeForm="true"
          :isEditing="editingEmployee !== null"
          :formType="'Employee'"
          :formData="employeeForm"
          @submit="handleEmployeeFormSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Form from "~/components/Form.vue";

let employees = ref([]);

let showModal = ref(false);
let editingEmployee = ref(null);

let employeeForm = ref({
  name: "",
  age: 0,
  gender: "Male",
  dateOfJoining: "",
  designation: "Manager",
});

let searchQuery = ref("");

const toggleModal = () => {
  showModal.value = !showModal.value;
  if (!showModal.value) {
    clearForm();
  }
};

const toggleAddEmployeeModal = () => {
  editingEmployee.value = null;
  toggleModal();
};

const editEmployee = (employee) => {
  editingEmployee.value = employee;
  employeeForm.value = { ...employee };
  toggleModal();
};

const clearForm = () => {
  employeeForm.value = {
    name: "",
    age: 0,
    gender: "Male",
    dateOfJoining: "",
    designation: "Manager",
  };
  editingEmployee.value = null;
};

const handleEmployeeFormSubmit = (formData) => {
  if (editingEmployee.value) {
    // Update existing employee
    const index = employees.value.findIndex(
      (employee) => employee.id === editingEmployee.value.id
    );
    employees.value[index] = { ...formData, id: editingEmployee.value.id };
  } else {
    // Add new employee
    const newEmployee = { ...formData, id: employees.value.length + 1 };
    employees.value.push(newEmployee);
  }

  // Save to local storage
  localStorage.setItem("employees", JSON.stringify(employees.value));

  toggleModal();
};

const deleteEmployee = (employeeId) => {
  employees.value = employees.value.filter(
    (employee) => employee.id !== employeeId
  );

  // Save to local storage
  localStorage.setItem("employees", JSON.stringify(employees.value));
};

// Filtered employees based on search query
const filteredEmployees = computed(() => {
  return employees.value.filter((employee) =>
    employee.name.includes(searchQuery.value)
  );
});

onMounted(() => {
  // Load employees from local storage on component mount
  const storedEmployees = localStorage.getItem("employees");
  employees.value = storedEmployees ? JSON.parse(storedEmployees) : [];
});
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 200px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
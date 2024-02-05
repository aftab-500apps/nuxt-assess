<!-- pages/contact-management.vue -->

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Contact Management System</h1>

    <!-- Search Input -->
    <input v-model="searchQuery" placeholder="Search by name" class="border p-2 mb-4" />

    <button @click="toggleAddContactModal" class="bg-green-500 text-white px-4 py-2 rounded mb-4">
      Add Contact
    </button>

    <!-- Display Contacts -->
    <div v-if="filteredContacts.length > 0" class="flex flex-wrap">
      <div v-for="contact in filteredContacts" :key="contact.id" class="card bg-white border p-4 m-2">
        <h3 class="text-lg font-bold">{{ contact.name }}</h3>
        <p>Phone: {{ contact.phone }}</p>
        <p>Country: {{ getCountryWithFlag(contact.country) }}</p>
        <button @click="editContact(contact)" class="bg-blue-500 text-white px-2 py-1 rounded mr-2">
          Edit
        </button>
        <button @click="deleteContact(contact.id)" class="bg-red-500 text-white px-2 py-1 rounded">
          Delete
        </button>
      </div>
    </div>

    <!-- Add/Edit Contact Modal -->
    <div v-if="showModal">
      <div class="modal-overlay" @click="toggleModal"></div>
      <div class="modal bg-white p-4 rounded">
        <Form
          :isEmployeeForm="false"
          :isEditing="editingContact !== null"
          :formType="'Contact'"
          :formData="contactForm"
          @submit="handleContactFormSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Form from '~/components/Form.vue';

let contacts = ref([]);

let showModal = ref(false);
let editingContact = ref(null);

let contactForm = ref({
  name: '',
  phone: '',
  country: 'USA',
});

let searchQuery = ref('');

const toggleModal = () => {
  showModal.value = !showModal.value;
  if (!showModal.value) {
    clearForm();
  }
};

const toggleAddContactModal = () => {
  editingContact.value = null;
  toggleModal();
};

const editContact = (contact) => {
  editingContact.value = contact;
  contactForm.value = { ...contact };
  toggleModal();
};

const clearForm = () => {
  contactForm.value = {
    name: '',
    phone: '',
    country: 'USA',
  };
  editingContact.value = null;
};

const handleContactFormSubmit = (formData) => {
  if (editingContact.value) {
    // Update existing contact
    const index = contacts.value.findIndex(
      (contact) => contact.id === editingContact.value.id
    );
    contacts.value[index] = { ...formData, id: editingContact.value.id };
  } else {
    // Add new contact
    const newContact = { ...formData, id: contacts.value.length + 1 };
    contacts.value.push(newContact);
  }

  // Save to local storage
  localStorage.setItem('contacts', JSON.stringify(contacts.value));

  toggleModal();
};

const deleteContact = (contactId) => {
  contacts.value = contacts.value.filter((contact) => contact.id !== contactId);

  // Save to local storage
  localStorage.setItem('contacts', JSON.stringify(contacts.value));
};

// Filtered contacts based on search query
const filteredContacts = computed(() => {
  return contacts.value.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  // Load contacts from local storage on component mount
  const storedContacts = localStorage.getItem('contacts');
  contacts.value = storedContacts ? JSON.parse(storedContacts) : [];
});

// Function to get country with flag (you need to implement this)
const getCountryWithFlag = (country) => {
  // Implement logic to get the country flag based on the country code
  // For example, return an emoji or an image based on the country
  return country;
};
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

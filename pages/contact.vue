<!-- pages/contact-management.vue -->

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Contact Management System</h1>

    <SearchInput v-model="searchQuery" placeholder="Search by name" />

    <ActionButton :onClick="toggleAddContactModal" label="Add Contact" />

    <div v-if="filteredContacts.length > 0" class="flex flex-wrap">
      <div
        v-for="contact in filteredContacts"
        :key="contact.id"
        class="card bg-white border p-4 m-2"
      >
        <h3 class="text-lg font-bold">{{ contact.name }}</h3>
        <p>Phone: {{ contact.phone }}</p>
        <p>Country: {{ getCountryWithFlag(contact.country) }}</p>
        <button
          @click="editContact(contact)"
          class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
        >
          Edit
        </button>
        <button
          @click="deleteContact(contact.id)"
          class="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>

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
import { ref, onMounted, computed } from "vue";
import Form from "~/components/Form.vue";

let contacts = ref([]);

let showModal = ref(false);
let editingContact = ref(null);

let contactForm = ref({
  name: "",
  phone: "",
  country: "India",
});

let searchQuery = ref("");

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
    name: "",
    phone: "",
    country: "India",
  };
  editingContact.value = null;
};

const handleContactFormSubmit = (formData) => {
  if (editingContact.value) {
    const index = contacts.value.findIndex(
      (contact) => contact.id === editingContact.value.id
    );
    contacts.value[index] = { ...formData, id: editingContact.value.id };
  } else {
    const newContact = { ...formData, id: contacts.value.length + 1 };
    contacts.value.push(newContact);
  }

  localStorage.setItem("contacts", JSON.stringify(contacts.value));

  toggleModal();
};

const deleteContact = (contactId) => {
  contacts.value = contacts.value.filter((contact) => contact.id !== contactId);

  localStorage.setItem("contacts", JSON.stringify(contacts.value));
};

const filteredContacts = computed(() => {
  return contacts.value.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  const storedContacts = localStorage.getItem("contacts");
  contacts.value = storedContacts ? JSON.parse(storedContacts) : [];
});

const getCountryWithFlag = (country) => {
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

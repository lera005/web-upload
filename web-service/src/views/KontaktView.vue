<template>
  <div class="kontakt-container">
    <h2>Kontakt</h2>
    <p>Du kannst uns per E-Mail erreichen:</p>
    <ul>
      <li><strong>Email:</strong> kontakt@mannq.com</li>
    </ul>
    <p>Oder nutze unser Kontaktformular:</p>
    <form @submit.prevent="submitForm">
      <label for="name">Name:</label>
      <input id="name" v-model="form.name" type="text" required />

      <label for="email">Email:</label>
      <input id="email" v-model="form.email" type="email" required />

      <label for="message">Nachricht:</label>
      <textarea id="message" v-model="form.message" required></textarea>

      <button type="submit">Absenden</button>
    </form>

    <p v-if="successMessage" class="success-msg">{{ successMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
      successMessage: "",
    };
  },
  methods: {
    submitForm() {
      this.successMessage = `Danke, ${this.form.name}, deine Nachricht wurde gesendet!`;
      this.form.name = "";
      this.form.email = "";
      this.form.message = "";
    },
  },
};
</script>

<style scoped>
.kontakt-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h2 {
  margin-bottom: 15px;
}

ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 20px;
}

li {
  margin-bottom: 5px;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #4cd3aa;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background-color: #3bb091;
}

.success-msg {
  margin-top: 15px;
  color: green;
  font-weight: 600;
}
</style>

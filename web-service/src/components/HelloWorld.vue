<template>
  <div id="app">
    <div class="container">
      <h1>Bilder hochladen</h1>

      <div v-if="!isLoggedIn">
        <button @click="login" class="button">Login</button>
      </div>

      <div v-if="isLoggedIn">
        <label for="file-upload" class="upload-label">
          Bilder auswählen
          <input type="file" id="file-upload" @change="handleFileUpload" multiple hidden />
        </label>

        <div v-if="images.length">
          <h2>Hochgeladene Bilder</h2>
          <div class="image-gallery">
            <div 
              v-for="(image, index) in images" 
              :key="index" 
              class="image-container"
              :class="{ selected: image.selected }"
              @click="toggleSelection(index)"
            >
              <img :src="image.url" alt="Hochgeladenes Bild" class="image-thumbnail" />
            </div>
          </div>
        </div>

        <button v-if="images.some(img => img.selected)" @click="downloadSelectedImages" class="button">
          Ausgewählte Bilder herunterladen
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLoggedIn: false,
      images: [],
    };
  },
  methods: {
    login() {
      this.isLoggedIn = true;
      this.loadImages();
    },

    async handleFileUpload(event) {
      const files = event.target.files;
      const formData = new FormData();

      Array.from(files).forEach(file => formData.append('images', file));

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.data.length) {
          this.images = [...this.images, ...response.data.map(img => ({ ...img, selected: false }))];
        }
      } catch (error) {
        console.error('Fehler beim Hochladen:', error);
      }
    },

    async loadImages() {
      try {
        const response = await axios.get('http://localhost:5000/images');
        this.images = response.data.map(img => ({ ...img, selected: false }));
      } catch (error) {
        console.error('Fehler beim Laden:', error);
      }
    },

    toggleSelection(index) {
      this.images[index].selected = !this.images[index].selected;
    },

    async downloadSelectedImages() {
      const selectedImages = this.images.filter(image => image.selected);
      if (selectedImages.length === 0) {
        alert('Bitte wählen Sie mindestens ein Bild aus.');
        return;
      }

      const ids = selectedImages.map(img => img.id).join(',');

      try {
        const response = await axios.get(`http://localhost:5000/download-multiple?ids=${ids}`, {
          responseType: 'blob',
        });

        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'images.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Fehler beim Herunterladen:', error);
      }
    }
  },
};
</script>

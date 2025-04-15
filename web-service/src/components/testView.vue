<template>
    <div class="container">
      <header class="header">
        <h1>📸 Fototransfer</h1>
        <button @click="toggleSelectAll" class="select-btn">
          {{ allSelected ? 'Alle abwählen' : 'Alle auswählen' }}
        </button>
      </header>
  
      <div v-if="images.length" class="image-gallery">
        <div 
          v-for="(image, index) in images" 
          :key="index" 
          class="image-container"
          :class="{ selected: selectedImages.includes(image.id) }"
          @click="toggleSelection(image.id)"
        >
          <img :src="image.url" alt="Uploaded Image" class="image-thumbnail" />
        </div>
      </div>
  
      <button v-if="selectedImages.length" @click="downloadSelectedImages" class="download-btn">
        📥 Ausgewählte herunterladen
      </button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        images: [],
        selectedImages: [],
      };
    },
    computed: {
      allSelected() {
        return this.selectedImages.length === this.images.length && this.images.length > 0;
      }
    },
    async mounted() {
      try {
        const response = await axios.get('http://localhost:5000/images');
        this.images = response.data;
      } catch (error) {
        console.error('Error loading images:', error);
      }
    },
    methods: {
      toggleSelection(id) {
        if (this.selectedImages.includes(id)) {
          this.selectedImages = this.selectedImages.filter(imgId => imgId !== id);
        } else {
          this.selectedImages.push(id);
        }
      },
      toggleSelectAll() {
        if (this.allSelected) {
          this.selectedImages = [];
        } else {
          this.selectedImages = this.images.map(img => img.id);
        }
      },
      async downloadSelectedImages() {
        if (!this.selectedImages.length) return;
  
        try {
          const response = await axios.get(`http://localhost:5000/download-multiple?ids=${this.selectedImages.join(',')}`, {
            responseType: 'blob',
          });
  
          const url = window.URL.createObjectURL(response.data);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'selected-images.zip';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error downloading selected images:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* 🌟 Global Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }
  
  body {
    background: #f8f9fa;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  
  /* 🌟 Container */
  .container {
    max-width: 800px;
    width: 90%;
    margin: auto;
    text-align: center;
    padding: 20px;
  }
  
  /* 🌟 Header */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .header h1 {
    font-size: 24px;
    font-weight: 600;
    color: #222;
  }
  
  /* 🌟 Select Button */
  .select-btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 12px 18px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .select-btn:hover {
    background: #0056b3;
  }
  
  /* 🌟 Image Gallery */
  .image-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin: 20px 0;
    justify-items: center;
  }
  
  /* 🌟 Image Container */
  .image-container {
    width: 180px;
    height: 180px;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid transparent;
  }
  
  .image-container:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  }
  
  .image-container.selected {
    border: 3px solid #28a745;
    box-shadow: 0px 6px 15px rgba(40, 167, 69, 0.3);
  }
  
  /* 🌟 Image */
  .image-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* 🌟 Download Button */
  .download-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 14px 20px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
    margin-top: 20px;
  }
  
  .download-btn:hover {
    background: #218838;
  }
  </style>
  
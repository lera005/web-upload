<template>
    <div class="container">
      <h1>Fototransfer</h1>
      <div class="content">
      <div class="content" v-if="!uploadSuccess">
        <p>Bitte wähle die Fotos aus, welche du hochladen möchtest.</p>
  
        <label for="file-upload" class="upload-label">
          Bilder durchsuchen
          <input type="file" id="file-upload" @change="handleFileUpload" multiple hidden />
        </label>
      </div>
  
      <div v-else class="success-message">
        <span class="check-icon">✓</span>
        <p>Du kannst nun auf dem Computer fortfahren.</p>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        uploadSuccess: false,
      };
    },
    methods: {
      async handleFileUpload(event) {
        const files = event.target.files;
        if (!files.length) return;
  
        const formData = new FormData();
        Array.from(files).forEach(file => formData.append('images', file));
        
        this.uploadSuccess = true;

        try {
          await axios.post('http://10.1.251.247:5000/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
  
          this.uploadSuccess = true;

          
        } catch (error) {
          console.error('Fehler beim Hochladen:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }

  .content {
    display: flex;
    height: calc(80vh - 20px);
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  h1 {
    margin-top: 70px;
    color: #333;
  }
  
  p {
    color: #86868B;
    margin-bottom: 20px;
  }
  
  .upload-label {
    padding: 15px;
    background-color: #323232;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    display: inline-block;
    transition: 0.3s ease;
  }
  
  .upload-label:hover {
    background-color: #444;
  }
  
  .success-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .check-icon {
    font-size: 60px;
    color: #333;
    margin-bottom: 10px;
  }
  </style>
  
<template>
  <div class="container">
    <div class="content">
      <!-- Upload-Formular -->
      <div class="content" v-if="!uploadSuccess">
        <p>Bitte wähle die Fotos aus, welche du hochladen möchtest.</p>

        <label for="file-upload" class="upload-label">
          Bilder durchsuchen
          <input
            type="file"
            id="file-upload"
            @change="handleFileUpload"
            multiple
            hidden
          />
        </label>

        <!-- Fortschrittsbalken -->
        <div v-if="isUploading" class="progress-wrapper">
          <div class="progress-bar" :style="{ width: uploadProgress + '%' }">
            <span class="progress-text">{{ uploadProgress }}%</span>
          </div>
        </div>
      </div>

      <!-- Erfolgsnachricht -->
      <div v-else class="success-message">
        <span class="check-icon">✓</span>
        <p>Du kannst nun auf dem Computer fortfahren.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      uploadSuccess: false,
      uploadProgress: 0,
      isUploading: false,
    };
  },
  methods: {
    async handleFileUpload(event) {
      const files = event.target.files;
      if (!files.length) return;

      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("images", file));

      this.uploadSuccess = false;
      this.uploadProgress = 0;
      this.isUploading = true;

      try {
        await axios.post(
          "https://fototransfer.mannq.com/api/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              this.uploadProgress = percent;
            },
          }
        );

        this.uploadSuccess = true;
      } catch (error) {
        console.error("Fehler beim Hochladen:", error);
        this.uploadSuccess = false;
      } finally {
        this.isUploading = false;
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
  color: #86868b;
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
.progress-wrapper {
  width: 80%;
  background: #e0e0e0;
  border-radius: 8px;
  margin-top: 20px;
  overflow: hidden;
  position: relative;
  height: 28px;
  text-align: center;
  font-weight: bold;
}

.progress-bar {
  height: 100%;
  background: #4cd3aa;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
}

.progress-text {
  z-index: 2;
}

@media screen and (max-width: 768px) {
  .content {
    height: 69vh;
  }

  .container {
    height: unset;
  }
}
</style>

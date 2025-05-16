<template>
  <div class="container">
    <div v-if="images.length" class="image-gallery">
      <div class="container-img">
        <button @click="toggleSelectAll" class="select-btn">
          {{ allSelected ? "Alle abwählen" : "Alle auswählen" }}
        </button>
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
    </div>

    <button
      v-if="selectedImages.length"
      @click="downloadSelectedImages"
      class="download-btn"
    >
      Ausgewählte herunterladen
    </button>
  </div>
  <div v-if="images.length <= 0" class="message-note">
    <p>
      Bitte rufe die Seite auf deinem Telefon auf und folge den Anweisungen.
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      images: [],
      selectedImages: [],
    };
  },
  computed: {
    allSelected() {
      return (
        this.selectedImages.length === this.images.length &&
        this.images.length > 0
      );
    },
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:5000/images/");
      this.images = response.data;
    } catch (error) {
      console.error("Error loading images: ", error);
    }
  },
  methods: {
    toggleSelection(id) {
      if (this.selectedImages.includes(id)) {
        this.selectedImages = this.selectedImages.filter(
          (imgId) => imgId !== id
        );
      } else {
        this.selectedImages.push(id);
      }
    },
    toggleSelectAll() {
      if (this.allSelected) {
        this.selectedImages = [];
      } else {
        this.selectedImages = this.images.map((img) => img.id);
      }
    },
    async downloadSelectedImages() {
      if (!this.selectedImages.length) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/download-multiple?ids=${this.selectedImages.join(
            ","
          )}`,
          {
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = url;
        link.download = "selected-images.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading selected images:", error);
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #f8f8f8;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container-img {
  max-width: 1000px;
  width: 95%;
  margin: auto;
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 3%;
}

.message-note {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 80%;
  margin: auto;
}

/*Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 26px;
  font-weight: 600;
  color: #222;
}

/* Select Button */
.select-btn {
  background: #333;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.select-btn:hover {
  background: #444;
}

/*Image Gallery */
.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin: 20px 0;
  justify-items: center;
}

/* Image Container */
.image-container {
  width: 220px;
  height: 220px;
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
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
}

.image-container.selected {
  border: 5px solid #12b304;
  box-shadow: 0px 6px 15px rgba(200, 200, 200, 0.4);
}

/* Image */
.image-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.95);
  transition: filter 0.3s;
}

.image-container:hover .image-thumbnail {
  filter: brightness(1);
}

/*Download Button */
.download-btn {
  background: #333;
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.download-btn:hover {
  background: #444;
}
</style>

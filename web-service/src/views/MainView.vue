<template>
  <div class="main">
    <div class="header">
      <div class="h-side-l">
        <img src="../../public/camera.png" class="h-img" />
        <h1>Fototransfer</h1>
      </div>
      <div class="h-side-r">
        <p @click="showHomeView" style="cursor: pointer">Start</p>
        <p @click="showHelpView" style="cursor: pointer">Hilfe</p>
        <p @click="showContactView" style="cursor: pointer">Kontakt</p>
        <button id="download-all" @click="toggleSelectAll">
          Alle herunterladen
        </button>
      </div>
    </div>
    <HilfeView v-if="showHelp" />
    <KontaktView v-if="showContact" />
    <div v-if="!showHelp && !showContact">
      <PCView v-if="deviceType === 'desktop'" ref="pcViewRef" />
      <MBView v-else />
    </div>
  </div>
</template>

<script>
import PCView from "../components/PCView.vue";
import MBView from "../components/MBView.vue";
import HilfeView from "./HilfeView.vue";
import KontaktView from "./KontaktView.vue";

export default {
  components: {
    PCView,
    MBView,
    HilfeView,
    KontaktView,
  },
  data() {
    return {
      deviceType: "desktop",
      images: [],
      selectedImages: [],
      showHelp: false,
      showContact: false,
    };
  },
  mounted() {
    this.deviceType = this.detectDevice();
  },
  methods: {
    toggleSelectAll() {
      if (this.deviceType === "desktop") {
        this.$refs.pcViewRef.toggleSelectAllDownload?.();
      }
    },
    detectDevice() {
      return /Mobi|Android|iPhone/i.test(navigator.userAgent)
        ? "mobile"
        : "desktop";
    },
    showHelpView() {
      this.showHelp = true;
      this.showContact = false;
    },
    showContactView() {
      this.showContact = true;
      this.showHelp = false;
    },
    showHomeView() {
      this.showContact = false;
      this.showHelp = false;
    },
  },
};
</script>
<style scoped>
.main {
  width: 100%;
  height: 120vh;
  background-color: transparent;
  margin-top: 0;
}

.image-container.selected {
  border: 5px solid #12b304;
  box-shadow: 0px 6px 15px rgba(200, 200, 200, 0.4);
}

.header {
  width: 100%;
  height: 80px;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 60px;
  padding-right: 60px;
}

.h-img {
  width: 30px;
  margin-right: 10px;
}

.header p {
  font-size: 18px;
}

.h-side-l {
  display: flex;
  align-items: center;
}

.h-side-r {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

.h-side-r p {
  padding-left: 20px;
  cursor: pointer;
}

#download-all {
  background: #333;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 20px;
}
@media screen and (max-width: 768px) {
  .header {
    flex-direction: column;
    height: auto;
    padding: 20px;
    text-align: center;
  }

  .h-side-l,
  .h-side-r {
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
  }
  #download-all {
    display: none;
  }
  .h-side-r {
    display: none;
  }
}
</style>

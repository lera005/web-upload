<template>
  <div class="main">
    <div class="header">
      <div class="h-side-l">
        <img src="../../public/camera.png" class="h-img" />
        <h1>Fototransfer</h1>
      </div>
      <div class="h-side-r">
        <p>Hilfe</p>
        <p>Kontakt</p>
        <p id="download-all">Alle herunterladen</p>
      </div>
    </div>
    <div>
      <PCView v-if="deviceType === 'desktop'" />
      <MBView v-else />
    </div>
  </div>
</template>

<script>
import PCView from "../components/PCView.vue";
import MBView from "../components/MBView.vue";

export default {
  components: {
    PCView,
    MBView,
  },
  data() {
    return {
      deviceType: "desktop",
    };
  },
  mounted() {
    this.deviceType = this.detectDevice();
  },
  methods: {
    detectDevice() {
      return /Mobi|Android|iPhone/i.test(navigator.userAgent)
        ? "mobile"
        : "desktop";
    },
  },
};
</script>
<style scoped>
.main {
  width: 100%;
  height: 100vh;
  background-color: transparent;
  margin-top: 0;
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
  padding: 10px;
  border-radius: 12px;
  background-color: #333;
  margin-left: 20px;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
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

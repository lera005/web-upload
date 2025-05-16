<template>
    <div class="main">
        <div class="header">
            <div><h1>Fototransfer</h1></div>
            <div class="h-side">
                <p>Hilfe</p>
                <p>Kontakt</p>
                <p id="download-all">Alle herunterladen</p>
            </div>
        </div>
      <PCView />
    </div>
</template>
  
<script>
  import PCView from '../components/PCView.vue';
  
  export default {
    components: {
      PCView
    },
    data() {
      return {};
    }
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
    padding-left: 90px;
    padding-right: 90px;
}

.header p {
    font-size: 24px;
}

.h-side {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
}


.h-side p {
    padding-left:20px;
}

#download-all {
    padding: 10px;
    border-radius: 12px;
    background-color: #333;
    margin-left:20px;
    color: #fff;
    font-weight: 500;
    cursor:pointer;
}
</style>
  
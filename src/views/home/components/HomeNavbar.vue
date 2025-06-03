
<template>
  <div class="home-navbar">
    <img class="logo" src="/logo.png" alt="logo" />
    <V-Button :is-full="true">
      Logowanie
    </V-Button>
  </div>
</template>

<script setup lang="ts">
import VButton from "../../../components/V-Button.vue";
</script>


<style scoped lang="scss">
  .home-navbar {
    margin-top: 10px;
    width: 100%;
    padding: 10px 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img{
      height: 40px;
    }
  }
</style>
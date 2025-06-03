<template>
  <div class="home-wrapper">
    <section class="hero-section">
      <HomeNavbar />
      <HomeHero/>
    </section>
    <section class="about-us-section">
      <AboutUs />
    </section>
  </div>

</template>

<script setup lang="ts">

import HomeHero from "./components/HomeHero.vue";
import HomeNavbar from "./components/HomeNavbar.vue";
import AboutUs from "./components/AboutUs.vue";
</script>

<style scoped lang="scss">
.home-wrapper {
  padding-inline: 16px;
  max-width: 1260px;
  margin: 0 auto;
}

.hero-section{
  height: 100svh;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (width > 700px) {
    height: auto;
  }
}
.about-us-section{
  margin-top: 50px;
  height: 100svh;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (width > 700px) {
    height: auto;
  }
}

</style>
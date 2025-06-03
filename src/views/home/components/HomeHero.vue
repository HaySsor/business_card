<template>
  <div class="home-hero-box">
    <div class="home-hero-avatar">
      <img src="/avatar.png"/>
    </div>
    <div class="hero-info-box">
      <h1>OneCard</h1>
      <span>
    OneCard to nowoczesny wizytownik online, który w jednym linku gromadzi numer telefonu,
      e-mail i profile społecznościowe, eliminując potrzebę papierowych wizytówek.
      Korzystanie jest proste i intuicyjne – udostępnij swoje dane kontaktowe jednym kliknięciem i miej je zawsze pod ręką.
    </span>

      <div class="home-hero-buttons">
        <V-Button @click="handleMoveToRegistration" :is-full="true" custom-class="full-width">
          Rejestracja
        </V-Button>
      </div>

      <motion.div
          v-if="isMobile"
          href="#about_us"
          :animate="{ y: [0, 20, 0] }"
          :transition="{
       duration: 0.5,        // czas trwania animacji “w górę i w dół”
       repeat: Infinity,     // zapętlaj
       repeatDelay: 2.5      // przerwa między kolejnymi cyklami
        }"
          class="bounce-arrow">
        <router-link :to="{hash : '#about_us'}">
          <AnOutlinedArrowDown class="bounce-arrow-icon"/>
        </router-link>
      </motion.div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {AnOutlinedArrowDown} from '@kalimahapps/vue-icons';
import {motion} from "motion-v"
import {inject} from "vue";
import {useRouter} from "vue-router";
import VButton from "../../../components/V-Button.vue";

const isMobile = inject('isMobile')
const router = useRouter()

const handleMoveToRegistration = () =>{
  router.push({name: 'Register'})
}

</script>

<style scoped lang="scss">
.home-hero-box {
  position: relative;
  isolation: isolate;
  height: 100%;

  @media (width > 700px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: center;
  }
}

.home-hero-avatar {
  position: relative;

  img {
    height: 350px;
  }


  @media (width > 700px) {
    grid-column:  2/-1;
    justify-self: start;

    img{
      height: 450px;
    }
  }
}

.hero-info-box{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  h1 {
    font-size: 4rem;
    background: var(--main-gradient);
    background-clip: text;
    color: transparent;
  }

  span {
    text-align: center;
    max-width: 300px;
    font-size: 1.4rem;
  }

  @media (width > 700px) {
    grid-column:  1/1;
    grid-row:  1/1;
    align-items: flex-start;
    width: 400px;

    span{
      text-align: left;
      max-width: 400px;
    }
  }
}

.home-hero-buttons {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
  justify-content: center;
  margin-top: 12px;

  .full-width {
    width: 100%;
    padding: 12px;
  }

  @media (width > 700px) {
    justify-content: flex-start;
    .full-width {
      width: 200px;
      padding: 12px;
    }
  }
}

.bounce-arrow {
  position: absolute;
  bottom: 20px;

  &-icon {
    font-size: 2.2rem;
    color: var(--dark-color);
  }

  @media (width > 700px) {
    display: none;
  }
}
</style>
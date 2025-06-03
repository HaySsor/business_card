<template>
  <div class="register-container">
    <div class="register-avatar">
      <img :src="registerStep === 3 ? '/loading_avatar.png' :'registration_avatar.png'" alt=""/>
      <h2>Rejestracja</h2>
    </div>
    <button @click="()=>registerStep = registerStep + 1">
      click
    </button>
    <div class="register-box">
      <StepElement :step="registerStep"/>
      <Transition name="slide-fade" mode="out-in">
        <component :updateStep="updateStep" :key="registerStep" :is="componetsList[registerStep - 1].component"/>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import FirstStep from "./components/FirstStep.vue";
import SecondStep from "./components/SecondStep.vue";
import {ref} from "vue";
import StepElement from "./components/StepElement.vue";
import EndStep from "./components/EndStep.vue";

const registerStep = ref(1)

const updateStep = (step: number) => {
  registerStep.value = step;
}

const componetsList = [
  {
    name : "FirstStep",
    component : FirstStep,
  },
  {
    name : "SecondStep",
    component : SecondStep,
  },
  {
    name : "EndStep",
    component : EndStep,
  }
]

</script>

<style scoped lang="scss">
.register-container {
  width: 100%;
  min-height: 100svh;
  overflow-x: hidden;
  padding-bottom: 40px;
}

.register-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 10px;

  img {
    height: 200px;
  }

  h2 {

    font-size: 2.5rem;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.slide-fade-enter-from{
  opacity: 0;
  transform: translateX(100px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.register-box {
  padding-inline: 16px;
}

</style>
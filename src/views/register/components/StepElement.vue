<template>
  <div class="steps-element-list">
    <div class="step-element-item">
      <div class="step-element-circle">
        <div class="step-element-circle-1"></div>
        <AkCheck class="icon"/>
      </div>
      <span>Krok 1</span>
    </div>
    <div class="step-connector">
      <div :class="['step-connector-fill', {'step-connector-fill-full' : step === 2 || step === 3}]"></div>
    </div>
    <div :class="['step-element-item', {'disabled-step': step === 1}]">
      <div class="step-element-circle">
        <div class="step-element-circle-2"></div>
        <AkCheck class="icon"/>
      </div>
      <span>Krok 2</span>
    </div>
    <div class="step-connector">
      <div :class="['step-connector-fill-2', {'step-connector-fill-full' : step === 3}]"></div>
    </div>
    <div :class="['step-element-item', {'disabled-step': step === 1 || step === 2 }]">
      <div class="step-element-circle">
        <div class="step-element-circle-3"></div>
        <AkCheck class="icon"/>
      </div>
      <span>Koniec</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AkCheck } from '@kalimahapps/vue-icons';

const props = defineProps<{
  step: number,
}>()


</script>


<style scoped lang="scss">
.steps-element-list {
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.step-element-item {
  display: flex;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;

  span{
    font-size: 1.2rem;
  }
}

.step-element-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  background-color: var(--light-gray);
  position: relative;
  .icon{
    color: white;
    font-size: 1.8rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: color 0.3s 1s;
  }
}

.step-element-circle-1 {
  background-color: var(--main-color);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.step-element-circle-2 {
  background-color: var(--sec-color);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 0.5s 0.5s;
}
.step-element-circle-3 {
  background-color: #14e0ec;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 0.5s 0.5s;
}

.step-connector{
  width: 50%;
  height: 5px;
  background: var(--light-gray);
  margin-bottom: 25px;
}
.step-connector-fill, .step-connector-fill-2{
  transition: width 0.5s;
  background: var(--main-gradient);
  width: 0;
  height: 100%;
}
.step-connector-fill-2{
  background: linear-gradient(90deg, var(--sec-color) 0%, #14e0ec  100%);
}
.step-connector-fill-full{
  width: 100%;
}
.disabled-step{
  .step-element-circle-2, .step-element-circle-3{
    width: 0;
  }

  .icon{
    opacity: 0.3;
    color: var(--dark-color);
  }
}
</style>
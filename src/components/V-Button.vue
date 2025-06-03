<template>
  <button :class="[ isFull ? 'full-button' : 'border-button',
  'button' ,
   customClass,
    {'is-disabled': isDisabled},
    {'is-loading': isLoading}
  ]"
  :disabled="isDisabled"
  >
    <div v-if="isLoading" class="dots">
      <motion.div
          class="dot"
          :animate="{ y: [-2, 2, -2] }"
          :transition="{ duration: 0.6, repeat: Infinity, delay: 0 }"
      />
      <motion.div
          class="dot"
          :animate="{ y: [-2, 2, -2] }"
          :transition="{ duration: 0.6, repeat: Infinity, delay: 0.2 }"
      />
      <motion.div
          class="dot"
          :animate="{ y: [-2, 2, -2] }"
          :transition="{ duration: 0.6, repeat: Infinity, delay: 0.4 }"
      />
    </div>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import {motion} from 'motion-v'

const props = defineProps<{
  isFull: boolean,
  customClass?: string,
  isLoading?: boolean,
  isDisabled?: boolean,
}>()

</script>

<style scoped lang="scss">

.button{
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 1.4rem;
  cursor: pointer;
}
.full-button{
  background: var(--main-gradient);
  color: white;
}
.is-disabled{
  cursor: not-allowed;
  opacity: 0.5;
}

.is-loading{
  position: relative;
}
.dots{
  position: absolute;
  inset: 0;
  background: var(--main-gradient);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.dot{
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: white;
}
</style>
<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, computed, provide} from 'vue'
const width = ref(window.innerWidth)
const onResize = () => {
  width.value = window.innerWidth
}
onMounted(() => {
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
const isMobile = computed(() => width.value < 700)

provide('isMobile', isMobile.value)

</script>

<style scoped lang="scss">

</style>



<template>
  <div class="input-box" :class="{'has-error': error}">
    <label class="label">{{label}}</label>
    <input v-model="inputValue" :type="type ? type : 'text'">
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  label: string,
  type?: string,
  error?: string,
}>()

const inputValue = defineModel('value')

</script>

<style scoped lang="scss">
.input-box{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;

  label{
    font-size: 1.5rem;
    font-weight: 500;
  }
  input{
    height: 35px;
    padding-inline: 10px;
    font-size: 1.4rem;
    border-radius: 8px;
    border: 1px solid var(--dark-color);
  }
  .error{
    color: lightcoral;
    font-size: 1.2rem;
    padding-left: 5px;
  }
}
.has-error{
  input{
    border-color: lightcoral;

  }
}
</style>
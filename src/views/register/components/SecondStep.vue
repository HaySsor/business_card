<template>
  <form @submit.prevent="handleSubmit" class="form-box">
    <div class="form-section">
      <div class="form-section-title">
        <CgUserList class="header-icon" />
        <h3>Dane osobowe</h3>
      </div>
      <VInput
          label="Imię"
          v-model:value="data.name.value"
          type="text"
          :error="data.name.error"
      />
      <VInput
          label="Nazwisko"
          v-model:value="data.surname.value"
          type="text"
          :error="data.surname.error"
      />
      <VInput
          label="Telefon"
          v-model:value="data.phone.value"
          type="tel"
          :error="data.phone.error"
      />
      <VInput
          label="Email"
          v-model:value="data.email.value"
          type="email"
          :error="data.email.error"
      />
      <VInput
          label="Miasto"
          v-model:value="data.city.value"
          type="text"
          :error="data.city.error"
      />
      <VInput
          label="Link do Twojej strony"
          v-model:value="data.website.value"
          type="text"
          :error="data.website.error"
      />
    </div>

    <div class="form-box-button">
      <V-Button
          :is-full="true"
          :is-disabled="isDisabledButton"
          :is-loading="isLoading"
      >
        Zapisz
      </V-Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { CgUserList } from "@kalimahapps/vue-icons"
import VInput from "../../../components/V-Input.vue"
import VButton from "../../../components/V-Button.vue"
import type { FormObjectType, UserType } from "../../../Types"
import {useUserStore} from "../../../store/user.ts";

const props = defineProps<{
  updateStep: (step: number) => void
}>()

const data = reactive<FormObjectType>({
  name: { value: "", error: "" },
  surname: { value: "", error: "" },
  phone: { value: "", error: "" },
  email: { value: "", error: "" },
  city: { value: "", error: "" },
  website: { value: "", error: "" },
})

const isLoading = ref(false)
const userStore = useUserStore()

const isDisabledButton = computed(() => {
  return data.name.value.trim().length === 0 || data.surname.value.trim().length === 0
})

async function handleSubmit() {
  Object.values(data).forEach((field) => (field.error = ""))

  if (!data.email.value.includes("@")) {
    data.email.error = "Nieprawidłowy format email"
    return
  }

  isLoading.value = true
  try {
    const sendData = {
      name: data.name.value.trim(),
      surname: data.surname.value.trim(),
      phone: data.phone.value.trim(),
      email: data.email.value.trim(),
      city: data.city.value.trim(),
      website: data.website.value.trim(),
    } as UserType

    await userStore.updateUserData(sendData)

    props.updateStep(3)
  } catch (err: any) {
    data.email.error = "Błąd zapisu danych"
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.form-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
  position: relative;
  margin-top: 20px;
  gap: 12px;
}

.form-box-button {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.form-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  padding: 20px 24px;

  .form-section-title {
    margin-bottom: 8px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;

    .header-icon {
      font-size: 3rem;
      color: white;
      padding: 5px;
      background-color: var(--sec-color);
      border-radius: 10px;
    }

    h3 {
      font-size: 2.2rem;
      font-weight: 400;
    }
  }
}
</style>

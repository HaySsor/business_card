<template>
  <form @submit.prevent="handleSubmit" class="form-box">
    <VInput
        label="Email"
        v-model:value="data.email.value"
        type="email"
        :error="data.email.error"
    />
    <VInput
        label="Hasło"
        v-model:value="data.password.value"
        type="password"
        :error="data.password.error"
    />
    <VInput
        label="Powtórz hasło"
        v-model:value="data.confirmPassword.value"
        type="password"
        :error="data.confirmPassword.error"
    />

    <div class="form-box-button">
      <V-Button
          :is-full="true"
          :is-disabled="isDisabledButton"
          :is-loading="isLoading"
      >
        Dalej
      </V-Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import VInput from "../../../components/V-Input.vue"
import { computed, reactive, ref } from "vue"
import VButton from "../../../components/V-Button.vue"
import type { FormObjectType } from "../../../Types"
import { registerUser } from "../../../firebase/firebase"
import {useUserStore} from "../../../store/user.ts";

const props = defineProps<{
  updateStep: (step: number) => void
}>()

const data = reactive<FormObjectType>({
  email: { value: "", error: "" },
  password: { value: "", error: "" },
  confirmPassword: { value: "", error: "" },
})

const userStore = useUserStore()
const isLoading = ref(false)

const isDisabledButton = computed(() => {
  return (
      data.email.value.length === 0 ||
      data.password.value.length === 0 ||
      data.confirmPassword.value.length === 0
  )
})

async function handleSubmit() {
  data.email.error = ""
  data.password.error = ""
  data.confirmPassword.error = ""

  if (data.password.value !== data.confirmPassword.value) {
    data.confirmPassword.error = "Hasła nie są takie same"
    return
  }

  isLoading.value = true
  try {
    const cred = await registerUser(data.email.value, data.password.value)
    await userStore.setUser(cred.user)

    props.updateStep(2)
  } catch (err: any) {
    const code = err.code as string
    if (code.includes("auth/email-already-in-use")) {
      data.email.error = "Ten adres jest już zajęty"
    } else if (code.includes("auth/invalid-email")) {
      data.email.error = "Nieprawidłowy format email"
    } else if (code.includes("auth/weak-password")) {
      data.password.error = "Hasło jest zbyt słabe"
    } else {
      data.email.error = "Błąd rejestracji"
    }
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
  padding: 20px 24px;
  gap: 12px;
}
.form-box-button {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>

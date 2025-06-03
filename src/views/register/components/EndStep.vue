<template>
  <div class="end-step">
    <!-- Tu dokładnie musi być ref="loadingTextRef" -->
    <span v-if="!isFinish" class="loading-info-text" ref="loadingTextRef">
      Właśnie tworzymy twoją kartę…
    </span>

      <div v-else class="end-step-finish">
        <h3>Twoja karat jest już gotowa! </h3>
        <VButton @click="handleMoveToCard" :is-full="true" custom-class="end-step-button">
          Zobacz
        </VButton>
      </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import VButton from "../../../components/V-Button.vue";
import {useRouter} from "vue-router";

const loadingTextRef = ref<HTMLElement | null>(null)
const isFinish = ref<boolean>(false)
const router = useRouter()


const handleMoveToCard = () =>{
  router.push({name: 'Card'})
}

onMounted(() => {
  const el = loadingTextRef.value
  if (!el) {
    console.warn("Brak elementu loadingTextRef, animacja nie działa")
    return
  }

  // 2) Pobierz oryginalny tekst i wyczyść zawartość
  const originalText = el.textContent || ""
  el.textContent = ""

  // 3) Rozbij tekst na litery (Array.from poprawnie obsłuży polskie znaki)
  const letters = Array.from(originalText)

  // 4) Utwórz <span class="letter"> dla każdej litery (zamieniając spacje na nbsp)
  const letterSpans = letters.map((char) => {
    const span = document.createElement("span")
    span.classList.add("letter")
    span.textContent = char === " " ? "\u00A0" : char
    return span
  })

  // 5) Włóż wszystkie litery z powrotem do span.loading-info-text
  letterSpans.forEach((span) => el.appendChild(span))

  // 6) Ustal parametry animacji
  const totalLetters = letterSpans.length
  const singleLetterAnimDuration = 0.8 // czas skoku jednej litery (sekundy)
  const letterStagger = 0.1 // opóźnienie między kolejnymi literami (sekundy)
  const totalCycle = (totalLetters - 1) * letterStagger + singleLetterAnimDuration

  // 7) Przypisz każdemu span.letter odpowiednią animację
  letterSpans.forEach((span, index) => {
    const delay = index * letterStagger
    // Pełny shorthand: nazwa animacji, czas trwania samego "bounce", funkcja easing,
    // opóźnienie startu, infinite – nieskończona pętla
    span.style.animation = `bounce ${singleLetterAnimDuration}s ease ${delay}s infinite`
    // A ustawiamy totalCycle jako całą długość cyklu, żeby pętla zaczynała się od początku
    span.style.animationDuration = `${totalCycle}s`
  })


  setTimeout(() => {
    isFinish.value = true
  }, 3000)
})


</script>

<style scoped lang="scss">
.end-step {
  width: 100%;
  height: 300px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    height: 250px;
    margin-bottom: 20px;
  }

  .loading-info-text {
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    padding-top: 10px;
  }
}
.end-step-button{
  width: 300px;
  height: 50px;
  font-size: 2rem;
}
.end-step-finish{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  h3{
    font-size: 2.2rem;
  }
}

</style>

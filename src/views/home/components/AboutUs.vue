<template>
  <div id="about_us" class="about-us-container">
    <div class="about-us-avatar">
      <img src="/about_us_avatar.png" alt=""/>
      <h2>O nas</h2>
    </div>

    <section class="features">
      <div class="feature-box">
        <h3>
          <BsShareFill class="icon"/>
          Szybkie udostępnianie
        </h3>
        <p>
          Dzięki OneCard wszystkie Twoje dane są w jednym krótkim linku, który wysyłasz w kilka sekund.
          Koniec z przepisywaniem numeru czy szukaniem papierowej wizytówki – jeden URL i gotowe.
        </p>
      </div>

      <div class="feature-box">
        <h3>
          <BsShieldFill class="icon"/>
          Pełna kontrola danych
        </h3>
        <p>
          Edytuj swoje informacje w czasie rzeczywistym bez instalowania dodatkowych aplikacji.
          Każda zmiana jest od razu widoczna u odbiorcy – zawsze masz pewność, że to, co udostępniasz, jest aktualne.
        </p>
      </div>

      <div class="feature-box">
        <h3>
          <AnFilledStar class="icon"/>
          Profesjonalny wizerunek
        </h3>
        <p>
          Nowoczesny design wizytówki podkreśla Twój profesjonalizm i dbałość o detale.
          Personalizuj kolory i układ pod swoją markę, by wyróżniać się wśród konkurencji.
        </p>
      </div>
    </section>


  </div>
</template>

<script setup lang="ts">
import {BsShareFill, BsShieldFill, AnFilledStar} from '@kalimahapps/vue-icons';
</script>

<style scoped lang="scss">
.about-us-container {
  padding-bottom: 40px;

  h2 {
    text-align: center;
    font-size: 3rem;
    color: var(--dark-color);
    margin-bottom: 15px;
  }
}

.features {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  width: 100%;

  @media (width > 900px) {
    grid-template-columns: repeat(3, 330px);
    justify-content: center;
  }
}

.about-us-avatar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 150px;
  }
}

.feature-box {
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  padding: 24px;
  isolation: isolate;
  background-color: var(--light-gray);


  h3 {
    font-size: 1.6rem;
    text-align: center;
    margin-bottom: 8px;
    text-transform: uppercase;
    font-weight: 4000;
    display: flex;
    align-items: center;
    gap: 6px;

    .icon {
      font-size: 1.8rem;
      color: var(--sec-color);
    }
  }

  p {
    font-size: 1.4rem;
    color: var(--text-gray);
  }
}
</style>
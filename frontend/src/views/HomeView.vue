<template>
  <main class="content">
    <form action="#" method="post">

      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">

          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                  v-for="dough in normalizedDough"
                  :class="`dough__input dough__input--${dough.value}`"
              >
                <input type="radio" name="dough" :value="dough.value" class="visually-hidden" checked>
                <b>{{ dough.name }}</b>
                <span>{{ dough.description }}</span>
              </label>
            </div>

          </div>

        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                  v-for="size in normalizedSizes"
                  :class="`diameter__input diameter__input--${size.value}`"
              >
                <input type="radio" name="diameter" :value="size.value" class="visually-hidden">
                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

            <div class="sheet__content ingredients">

              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                    v-for="sauce in normalizedSauces"
                    class="radio ingredients__input"
                >
                  <input type="radio" name="sauce" :value="sauce.value" :checked="sauce.id === 1">
                  <span>{{ sauce.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                      v-for="ingredient in normalizedIngredients"
                      class="ingredients__item">
                    <span :class="`filling filling--${ingredient.value}`">{{ ingredient.name }}</span>

                    <div class="counter counter--orange ingredients__counter">
                      <button type="button" class="counter__button counter__button--minus" disabled>
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input type="text" name="counter" class="counter__input" value="0">
                      <button type="button" class="counter__button counter__button--plus">
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input type="text" name="pizza_name" placeholder="Введите название пиццы">
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>

      </div>

    </form>
  </main>
</template>

<script setup>
import rawDough from '@/mocks/dough.json';
import rawSizes from '@/mocks/sizes.json';
import rawSauces from "@/mocks/sauces.json";
import rawIngredients from '@/mocks/ingredients.json';
import { normalizeDough, normalizeSizes, normalizeSauces, normalizeIngredients } from "@/common/helpers/normalize";

const normalizedDough = rawDough.map(dough => normalizeDough(dough));
const normalizedSizes = rawSizes.map(size => normalizeSizes(size));
const normalizedSauces = rawSauces.map(sauce => normalizeSauces(sauce));
const normalizedIngredients = rawIngredients.map(ingredient => normalizeIngredients(ingredient));

const getImage = image => {
  // https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
  return new URL(`../assets/img/${image}`, import.meta.url).href
}
</script>
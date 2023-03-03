import { defineStore } from "pinia";
import { ingredientsQuantity } from "@/common/helpers/ingredients-quantity";
import { pizzaPrice } from "@/common/helpers/pizza-price";
import { useDataStore } from "@/stores/data";

export const usePizzaStore = defineStore("pizza", {
    state: () => ({
        index: null,
        name: "",
        sauceId: 0,
        doughId: 0,
        sizeId: 0,
        ingredients: [],
    }),
    getters: {
        sauce: (state) => {
            const data = useDataStore();
            return data.sauces.find((item) => item.id === state.sauceId) ?? data.sauces[0];
        },
        dough: (state) => {
            const data = useDataStore();
            return data.doughs.find((item) => item.id === state.doughId) ?? data.doughs[0];
        },
        size: (state) => {
            const data = useDataStore();
            return data.sizes.find((item) => item.id === state.sizeId) ?? data.sizes[0];
        },
        ingredientsExtended: (state) => {
            const data = useDataStore();
            const pizzaIngredientsIds = state.ingredients.map((item) => item.ingredientId);
            return data.ingredients
                .filter((item) => pizzaIngredientsIds.includes(item.id))
                .map((item, index) => {
                    return {
                        ...item,
                        quantity: state.ingredients[index]?.quantity ?? 0,
                    };
                });
        },
        price: (state) => {
            return pizzaPrice(state);
        },
        ingredientQuantities: (state) => {
            return ingredientsQuantity(state);
        },
    },
    actions: {
        setName(name) {
            this.name = name;
        },
        setSauce(sauceId) {
            this.sauceId = sauceId;
        },
        setDough(doughId) {
            this.doughId = doughId;
        },
        setSize(sizeId) {
            this.sizeId = sizeId;
        },
        setIngredients(ingredients) {
            this.ingredients = ingredients;
        },
        addIngredient(ingredientId) {
            this.ingredients.push({
                ingredientId,
                quantity: 1,
            });
        },
        incrementIngredientQuantity(ingredientId) {
            const ingredientIndex = this.ingredients.findIndex(
                (item) => item.ingredientId === ingredientId
            );

            if (ingredientIndex === -1) {
                this.addIngredient(ingredientId);
                return;
            }

            this.ingredients[ingredientIndex].quantity++;
        },
        setIngredientQuantity(ingredientId, count) {
            const ingredientIndex = this.ingredients.findIndex(
                (item) => item.ingredientId === ingredientId
            );

            /*
             * Добавляем ингредиент, если его нет, а количество больше 0
             * Если ингредиента нет, а количество 0, то ничего не делаем
             */
            if (ingredientIndex === -1 && count > 0) {
                this.addIngredient(ingredientId);
                return;
            } else if (ingredientIndex === -1) {
                return;
            }

            /* Удаляем ингредиент, если количество 0 */
            if (count === 0) {
                this.ingredients.splice(ingredientIndex, 1);
                return;
            }

            this.ingredients[ingredientIndex].quantity = count;
        },
        loadPizza(pizza) {
            this.index = pizza.index;
            this.name = pizza.name;
            this.sauceId = pizza.sauceId;
            this.doughId = pizza.doughId;
            this.sizeId = pizza.sizeId;
            this.ingredients = pizza.ingredients;
        },
    }
});
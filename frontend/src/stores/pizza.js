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
    actions: {}
});
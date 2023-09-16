
import type { Food, FoodModel } from '@/models/food.model';
import api from '@/services';
import { defineStore } from 'pinia'
import { ref } from 'vue'

const URI = "/food"
const foods = ref<Food[] | any>()
const search = ref<string>("")
const page = ref<number>(1)
const totalPages = ref()
const totalCount = ref()

export const useFoodStore = defineStore('food', {
    state: () => ({
        foods,
        search,
        page,
        totalPages,
        totalCount
    }),

    actions: {
        async fetchFood() {
            try {
                const response = await api.get(`${URI}?search=${this.search}&page=${this.page}`);
                this.foods = response.data.data;
                this.page = response.data.page;
                this.totalPages = response.data.totalPages;
                this.totalCount = response.data.totalCount;
            } catch (error) {
                console.error('Erreur lors de la récupération d\'aliments :', error);
            }
        },

        async searchFood(searchQuery: string) {
            try {
                this.search = searchQuery;
                await this.fetchFood();
            } catch (error) {
                console.error('Erreur lors de la recherche d\'aliments :', error);
            }
        },

        async paginateFood(pageQuery: number) {
            try {
                this.page = pageQuery;
                await this.fetchFood();
            } catch (error) {
                console.error('Erreur lors de la recherche d\'aliments :', error);
            }
        },
    },

    getters: {
        getTodos(): any {
            return this.foods;
        },
    },
})
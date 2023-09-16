<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useFoodStore } from '@/stores/food.store'
  import api from '@/services';
  import {pagineted, Previous, Next} from '@/shared/Pagination'

  const foodStore = useFoodStore()
  const currentPage = ref<number>(1)
  const id = ref<number>()

  const showDeleteModal = ref(false);

  const closeModal = () => {
    showDeleteModal.value = false;
  };

  const confirmDelete = () => {
    api.delete(`/food/${id.value}`).then(() => {
      foodStore.foods = foodStore.foods.filter((food: any) => food.id !== id.value);
      closeModal();
    })
  };

  const fetchFood = () => {
    foodStore.fetchFood();
  };

  const searchFood = () => {
    foodStore.searchFood(foodStore.search);
  };



  const paginateFood = (page: number) => {
    pagineted(page, foodStore.paginateFood(page), currentPage.value)
  };

  const handlePrev = () => {
    Previous(currentPage.value, foodStore.paginateFood(currentPage.value - 1), foodStore.paginateFood(1))
  }

  const handleNext = () => {
    Next(currentPage.value, foodStore.paginateFood(currentPage.value + 1), foodStore.paginateFood(foodStore.page), foodStore.page)
  }

  const showModal = (idCurrent: number) => {
    showDeleteModal.value = true
    id.value = idCurrent
  }

  onMounted(() => {
    fetchFood();
  });

</script>

<template>
  <div class="container">
    <div class="d-flex justify-content-between py-5">
      <h4>Foods</h4>
      <router-link to="food/create" class="btn btn-primary">Nouveau</router-link>
    </div>
    <div class="d-flex justify-content-end">
      <input type="text" class="form-control w-25" placeholder="Rechercher..." v-model="foodStore.search"
        @input="searchFood" />
    </div>
    <table class="table my-2">
      <thead>
        <tr>
          <th class="text-center">Designation</th>
          <th class="text-center">Prix</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="food in foodStore.foods" :key="food.id">
          <td class="text-center">{{ food.designation }}</td>
          <td class="text-center">{{ food.price }}</td>
          <td class="text-center">
            <router-link :to="'/food/edit/' + food.id" class="btn btn-warning">Modifier</router-link>
            <button class="btn btn-danger ms-1" @click="showModal(food.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-end">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><button class="page-link" @click="handlePrev">Previous</button></li>
          <template v-for="page in foodStore.totalPages" :key="page">
            <li class="page-item"><button class="page-link" @click="paginateFood(page)">{{ page }}</button></li>
          </template>
          <li class="page-item"><button class="page-link" @click="handleNext">Next</button></li>
        </ul>
      </nav>
    </div>
  </div>

  <div class="modal" tabindex="-1" role="dialog" :style="{ display: showDeleteModal ? 'block' : 'none', transition: 'opacity 0.5s ease-in-out' }">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmation de suppression</h5>
        </div>
        <div class="modal-body">
          <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Annuler</button>
          <button type="button" class="btn btn-danger" @click="confirmDelete">Supprimer</button>
        </div>
      </div>
    </div>
  </div>

</template>

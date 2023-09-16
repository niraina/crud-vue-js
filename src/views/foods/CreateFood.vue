<script setup lang="ts">
    import {reactive, onMounted, ref} from 'vue'
    import api from '@/services';
    import { useRouter, useRoute  } from 'vue-router';

    const router = useRouter();
    const route = useRoute();

    const current = ref<any>()

    const id = route.params.id;

    
    const data = reactive({
        designation: '',
        price: 0,
        recette: ''
    })
    
    const fetchOneFood = async(idCurrent: any) => {
        if(id) {
            await api.get(`/food/${idCurrent}`).then(response => {
                current.value = response.data.data
                data.designation = response.data.data.designation
                data.price = response.data.data.price
                data.recette = response.data.data.recette
            })
        }
    }

    const handleSubmit = () => {
        if(id) {
            api.put(`/food/${id}`, data).then(() => {
                data.designation= '';
                data.price= 0,
                data.recette= ''
                router.push('/food');
            })
        }else {
            api.post('/food', data).then(() => {
                data.designation= '';
                data.price= 0,
                data.recette= ''
                router.push('/food');
            })
        }
    }

    onMounted(() => {
        fetchOneFood(id)
    })

</script>
<template>
    <div class="container my-5">
        <form @submit.prevent="handleSubmit">
            <div>
                <label>Designation</label>
                <input type="text" class="form-control" v-model="data.designation">
            </div>
            <div>
                <label>Prix</label>
                <input type="number" class="form-control" v-model="data.price">
            </div>
            <div>
                <label>Recette</label>
                <input type="text" class="form-control" v-model="data.recette">
            </div>
            <div class="mt-3">
                <button type="submit" class="btn btn-primary">Enregistrer</button>
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
    showModal: Boolean,
    title: String,
    confirmButtonText: String,
});

const emit = defineEmits(['close', 'confirm']);

const closeModal = () => {
    emit('close');
};

const confirmAction = () => {
    emit('confirm');
};
</script>
<template>
    <div>
        <div class="modal" tabindex="-1" role="dialog" :class="{ 'show': showModal }" style="{ display: showDeleteModal ? 'block' : 'none', transition: 'opacity 0.5s ease-in-out' }">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                        <button type="button" class="close" @click="closeModal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">Annuler</button>
                        <button type="button" class="btn btn-danger" @click="confirmAction">{{ confirmButtonText }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

  
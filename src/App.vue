<script setup lang="ts">
import { ref } from 'vue';
import IncidentForm from './components/IncidentForm.vue';
import IncidentList from './components/IncidentList.vue';
import IncidentFilters from './components/IncidentFilters.vue';
import Button from './components/ui/Button.vue';

const showCreateModal = ref(false);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Gestión de Incidencias
        </h1>
        
        <Button
          variant="primary"
          size="lg"
          @click="showCreateModal = true"
        >
          Nueva Incidencia
        </Button>
      </div>

      <IncidentFilters />
      
      <IncidentList />
    </div>

    <!-- Modal de creación -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="max-w-2xl w-full">
        <IncidentForm
          mode="create"
          @close="showCreateModal = false"
        />
      </div>
    </div>
  </div>
</template>

<style>
body {
  @apply bg-gray-50;
}
</style>
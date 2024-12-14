<script setup lang="ts">
import { ref } from 'vue';
import { useIncidentStore } from '../stores/incidents';
import Badge from './ui/Badge.vue';
import Button from './ui/Button.vue';
import IncidentForm from './IncidentForm.vue';
import type { Incident } from '../types/incident';

// Acceder a la almacen de incidencias para gestionar datos
const store = useIncidentStore();

// Variables reactivas para controlar el estado del componente
const editingIncident = ref<Incident | null>(null);
const showEditModal = ref(false);

// Función para iniciar el proceso de edición de una incidencia
function handleEdit(incident: Incident) {
  editingIncident.value = incident;
  showEditModal.value = true;
}

// Función para eliminar una incidencia
function handleDelete(id: number) {
  if (confirm('¿Estás seguro de que deseas eliminar esta incidencia?')) {
    store.deleteIncident(id);
  }
}

// Función para cerrar el modal de edición
function closeEditModal() {
  showEditModal.value = false;
  editingIncident.value = null;
}

// Función para traducir la prioridad de una incidencia a español
function translatePriority(priority: string): string {
  const priorityMap: Record<string, string> = {
    high: 'Alto',
    medium: 'Medio',
    low: 'Baja',
    open: 'Abierto',
    progress: 'En progreso',
    resolved: 'Resuelto',
    closed: 'Cerrado'
  };
  return priorityMap[priority] || priority;
}
</script>


<template>
  <div class="space-y-4">
    <!-- Mostrar un mensaje si no hay incidencias filtradas -->
    <div v-if="store.filteredIncidents.length === 0" class="text-center text-gray-500 p-8">
      <img class="draw w-36 h-36 m-auto flex mb-2.5" src="../assets/empty.svg" alt="">
      <p class="text-xl">No hay incidencias que mostrar</p>
    </div>
    <!-- Lista de incidencias filtradas --> 
    <div v-else class="space-y-4">
      <div v-for="incident in store.filteredIncidents" :key="incident.id"
        class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 space-y-3">
        <!-- Mostrar información de la incidencia -->
        <div class="incidentItem flex justify-between items-start">
          <div class="flex justify-between items-start items-center"><img
              class="w-36 h-36 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="../assets/form2.svg" alt="">
            <h3
              class="text-xl font-semibold text-sky-500 dark:text-sky-400 pt-6 md:p-8 text-center md:text-left space-y-4">
              {{ incident.title }}</h3>
          </div>
          <div class="flex justify-between ">
            <div class="flex gap-2">
              Prioridad: <Badge variant="priority" :type="incident.priority">
                {{ translatePriority(incident.priority) }}
              </Badge>
              Estado: <Badge variant="status" :type="incident.status">
                {{ translatePriority(incident.status) }}
              </Badge>
            </div>
          </div>
        </div>
        <p class="text-gray-600">{{ incident.description }}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
          <div v-if="incident.assignee">
            <span class="font-medium">Asignado a:</span> {{ incident.assignee }}
          </div>
          <div v-if="incident.category">
            <span class="font-medium">Categoría:</span> {{ incident.category }}
          </div>
          <div>
            <span class="font-medium">Creado:</span> {{ new Date(incident.createdAt).toLocaleString() }}
          </div>
          <div>
            <span class="font-medium">Actualizado:</span> {{ new Date(incident.updatedAt).toLocaleString() }}
          </div>
        </div>
        <!-- Controles para editar y eliminar la incidencia -->
        <div class="flex justify-end space-x-2 pt-2">
          <select v-model="incident.status" @change="store.updateIncident(incident.id, { status: incident.status })"
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm">
            <option value="open">Abierto</option>
            <option value="progress">En progreso</option>
            <option value="resolved">Resuelto</option>
            <option value="closed">Cerrado</option>
          </select>

          <Button variant="secondary" size="sm" @click="handleEdit(incident)">
            Editar
          </Button>

          <Button variant="danger" size="sm" @click="handleDelete(incident.id)">
            Eliminar
          </Button>
        </div>
      </div>
    </div>

    <!-- Modal de edición -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="max-w-2xl w-full">
        <IncidentForm mode="edit" :incident="editingIncident" @close="closeEditModal" />
      </div>
    </div>
  </div>
</template>

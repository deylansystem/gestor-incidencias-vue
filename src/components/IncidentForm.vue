<script setup lang="ts">
import { ref, watch } from 'vue';
import { useIncidentStore } from '../stores/incidents';
import Button from './ui/Button.vue';
import type { Incident, IncidentFormMode } from '../types/incident';

const props = defineProps<{
  mode?: IncidentFormMode;
  incident?: Incident;
}>();

const emit = defineEmits(['close']);

const store = useIncidentStore();

const title = ref('');
const description = ref('');
const priority = ref<'low' | 'medium' | 'high'>('medium');
const assignee = ref('');
const category = ref('');

watch(() => props.incident, (newIncident) => {
  if (newIncident && props.mode === 'edit') {
    title.value = newIncident.title;
    description.value = newIncident.description;
    priority.value = newIncident.priority;
    assignee.value = newIncident.assignee || '';
    category.value = newIncident.category || '';
  }
}, { immediate: true });

function handleSubmit() {
  const incidentData = {
    title: title.value,
    description: description.value,
    priority: priority.value,
    assignee: assignee.value || undefined,
    category: category.value || undefined,
    status: 'open' as const,
  };

  if (props.mode === 'edit' && props.incident) {
    store.updateIncident(props.incident.id, incidentData);
  } else {
    store.addIncident(incidentData);
  }

  resetForm();
  emit('close');
}

function resetForm() {
  title.value = '';
  description.value = '';
  priority.value = 'medium';
  assignee.value = '';
  category.value = '';
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-lg space-y-4">
    <div class="space-y-4">
      <img class="draw" src="../assets/form.svg" alt="">
      <div>
        <label class="block text-sm font-medium text-gray-700">Título</label>
        <input v-model="title" placeholder="Introduce el titulo de la incidencia..." type="text" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea v-model="description" placeholder="Describe la incidencia, Los detalles son importante..." required rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Prioridad</label>
          <select v-model="priority"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Categoría</label>
          <!-- <input
            v-model="category"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          /> -->
          <select v-model="category"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
           
              <option value="">Selecciona una categoría</option>
              <optgroup label="Hardware">
                <option value="hardware_impresora" data-subcategoria="impresora">Impresora</option>
                <option value="hardware_equipo_escritorio" data-subcategoria="equipo_escritorio">Equipo de escritorio
                </option>
                <option value="hardware_portatil" data-subcategoria="portátil">Portátil</option>
                <option value="hardware_red" data-subcategoria="red">Red</option>
              </optgroup>
              <optgroup label="Software">
                <option value="software_sistema_operativo" data-subcategoria="sistema_operativo">Sistema operativo
                </option>
                <option value="software_ofimatica" data-subcategoria="ofimatica">Ofimática</option>
                <option value="software_especifico" data-subcategoria="especifico">Software específico</option>
              </optgroup>
              <option value="red_internet" data-subcategoria="internet">Conexión a internet</option>
              <option value="red_intranet" data-subcategoria="intranet">Intranet</option>
              <option value="seguridad_acceso" data-subcategoria="acceso">Acceso no autorizado</option>
              <option value="seguridad_datos" data-subcategoria="datos">Pérdida de datos</option>
              <option value="otros_formacion" data-subcategoria="formacion">Formación</option>
              <option value="otros_consultas" data-subcategoria="consultas">Consultas generales</option>
      
          </select>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Asignado a</label>
        <input v-model="assignee" placeholder="Nombre de la persona encargada de la incidencia..." type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
      </div>
    </div>

    <div class="flex justify-end space-x-3 pt-4">
      <Button type="button" variant="secondary" size="md" @click="emit('close')">
        Cancelar
      </Button>
      <Button type="submit" variant="primary" size="md">
        {{ mode === 'edit' ? 'Actualizar' : 'Crear' }} Incidencia
      </Button>
    </div>
  </form>
</template>
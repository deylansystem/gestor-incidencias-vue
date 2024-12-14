import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Incident } from '../types/incident';

export const useIncidentStore = defineStore('incidents', () => {
  const incidents = ref<Incident[]>([]);
  const filterStatus = ref<string>('all');
  const filterPriority = ref<string>('all');
  const searchQuery = ref('');

  const filteredIncidents = computed(() => {
    return incidents.value
      .filter(incident => {
        if (filterStatus.value === 'all') return true;
        return incident.status === filterStatus.value;
      })
      .filter(incident => {
        if (filterPriority.value === 'all') return true;
        return incident.priority === filterPriority.value;
      })
      .filter(incident => {
        if (!searchQuery.value) return true;
        return incident.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
               incident.description.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
  });

  function addIncident(incident: Omit<Incident, 'id' | 'createdAt' | 'updatedAt'>) {
    const newIncident: Incident = {
      ...incident,
      id: Date.now(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    incidents.value.push(newIncident);
  }

  function updateIncident(id: number, updates: Partial<Incident>) {
    const index = incidents.value.findIndex(inc => inc.id === id);
    if (index !== -1) {
      incidents.value[index] = {
        ...incidents.value[index],
        ...updates,
        updatedAt: new Date()
      };
    }
  }

  function deleteIncident(id: number) {
    const index = incidents.value.findIndex(inc => inc.id === id);
    if (index !== -1) {
      incidents.value.splice(index, 1);
    }
  }

  return {
    incidents,
    filterStatus,
    filterPriority,
    searchQuery,
    filteredIncidents,
    addIncident,
    updateIncident,
    deleteIncident,
  };
});
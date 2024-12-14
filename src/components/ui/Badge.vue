<script setup lang="ts">
defineProps<{
  variant: 'priority' | 'status';
  type: string;
}>();

const priorityColors = {
  'low': 'from-gray-100 to-gray-200 text-gray-800',
  'medium': 'from-orange-100 to-orange-200 text-orange-800',
  'high': 'from-red-100 to-red-200 text-red-800'
};

const statusColors = {
  'open': 'from-yellow-100 to-yellow-200 text-yellow-800',
  'in-progress': 'from-blue-100 to-blue-200 text-blue-800',
  'resolved': 'from-green-100 to-green-200 text-green-800',
  'closed': 'from-gray-100 to-gray-200 text-gray-800'
};
</script>

<template>
  <span
    class="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r shadow-sm"
    :class="variant === 'priority' ? priorityColors[type] : statusColors[type]"
  >
    <slot></slot>
  </span>
</template>
<template>

  <button
    class="category-card"
    :class="{ active: active }"
    @click="$emit('select')"
  >

    <component
      :is="icon"
      :size="25"
    />

    <span>
      {{ name }}
    </span>

  </button>

</template>

<script setup lang="ts">

import type { Component } from 'vue'

defineProps<{
  name: string
  icon: Component
  active?: boolean
}>()

defineEmits<{
  select: []
}>()

</script>
<style scoped>
/* ================= CATEGORY CARD / BUTTON ================= */
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 20px;
  min-height: 96px;
  background: white;
  border: 1px solid #f8bbd0;
  border-radius: 20px;
  cursor: pointer;
  color: #555555;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  width: 100%;
  -webkit-tap-highlight-color: transparent;
}

/* Hover Effect */
.category-card:hover {
  border-color: #f48fb1;
  color: #d81b60;
  background: #fdf2f8;
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(216, 27, 96, 0.08);
}

/* Active State (ពេល Category ត្រូវ​បាន Select) */
.category-card.active {
  background: linear-gradient(135deg, #e91e63 0%, #d81b60 100%);
  border-color: #d81b60;
  color: white;
  box-shadow: 0 8px 20px rgba(216, 27, 96, 0.28);
  transform: translateY(-2px);
}

.category-card.active:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(216, 27, 96, 0.35);
}

/* Icon & Label Styling */
.category-card :deep(svg) {
  transition: transform 0.25s ease;
}

.category-card:hover :deep(svg) {
  transform: scale(1.1);
}

.category-card span {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.2px;
  line-height: 1.2;
}

/* Click Feedback */
.category-card:active {
  transform: scale(0.96);
}
</style>
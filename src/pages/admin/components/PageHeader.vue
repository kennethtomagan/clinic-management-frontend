<template>
  <div class="page-header q-pa-md">
    <div class="row items-center q-mb-md">
      <div class="text-h5">{{ title }}</div>
    </div>
    <q-breadcrumbs separator=">" class="text-grey-8">
      <q-breadcrumbs-el icon="home" to="/admin/dashboard" />
      <template v-for="(crumb, index) in breadcrumbs" :key="index">
        <q-breadcrumbs-el
          :label="crumb.label"
          :to="crumb.to"
          :icon="crumb.icon"
        />
      </template>
    </q-breadcrumbs>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  breadcrumbs: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.page-header {
  background: white;
  border-bottom: 1px solid #e0e0e0;
}
</style>
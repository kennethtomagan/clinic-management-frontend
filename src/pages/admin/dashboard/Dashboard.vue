<template>
  <q-page class="q-pa-sm">
    <DashboardWidget 
      icon_position="left"
      :counts="counts"
    />
  </q-page>
</template>
<script setup>
import DashboardWidget from './components/DashboardWidget.vue'
import { useDashboard } from 'stores/dashboard'
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue';

const storeDashboard = useDashboard();
const counts = reactive({
    doctors: 0,
    patients: 0,
    products: 0,
    appointments: 0,
})

const fetchDashboardCounts = () => {

    storeDashboard.getDashboardCounts().then((response) => {
      counts.doctors = response.data.doctors;
      counts.patients = response.data.patients;
      counts.products = response.data.products;
      counts.appointments = response.data.appointments;
      console.log(counts)
        // doctors.value = response.data.data;
        // selected_doctor.value = doctors.value[0]
    })
};



// Set default selected contact when mounted
onMounted(() => {
    fetchDashboardCounts();
});
</script>


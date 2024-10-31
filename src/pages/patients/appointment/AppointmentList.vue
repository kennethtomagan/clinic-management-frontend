<template>
  <q-page class="q-pa-md ">
    <q-list class="q-ma-sm q-mt-md" v-if="!loading">
      <q-expansion-item
        style="border-radius: 10px"
        popup
        header-class="bg-white"
        v-for="(appointment, index) in appointments"
        :key="index"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="event"></q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Clinic Appointment</q-item-label>
            <q-item-label caption>{{appointment.date}} - {{appointment.slot.start}} - {{appointment.slot.end}} </q-item-label>
          </q-item-section>
        </template>

        <q-separator />
        <q-card>
          <q-card-section>
            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <q-avatar icon="health_and_safety" color="grey-2" text-color="grey-8" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1">Clinic</q-item-label>
                <q-item-label caption class="text-grey-8">{{appointment.clinic.name}} </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <q-avatar icon="event" color="grey-2" text-color="grey-8" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1">Date</q-item-label>
                <q-item-label caption class="text-grey-8">{{appointment.date}} </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <q-avatar icon="schedule" color="grey-2" text-color="grey-8" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1">Time Slot</q-item-label>
                <q-item-label caption class="text-grey-8">{{appointment.slot.start}} - {{appointment.slot.end}} </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <q-avatar icon="person" color="grey-2" text-color="grey-8" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1">Doctor</q-item-label>
                <q-item-label caption class="text-grey-8">{{appointment.doctor.name}}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <q-avatar icon="note" color="grey-2" text-color="grey-8" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1">Reason</q-item-label>
                <q-item-label caption class="text-grey-8">{{appointment.description}}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar top>
                <q-avatar
                  v-if="appointment.status == 'pending'"
                  icon="hourglass_empty"
                  color="yellow-2"
                  text-color="yellow-8"
                />
                <q-avatar
                  v-else-if="appointment.status == 'canceled'"
                  icon="cancel"
                  color="red-2"
                  text-color="red-8"
                />
                <q-avatar
                  v-else-if="appointment.status == 'confirmed'"
                  icon="check_circle"
                  color="green-2"
                  text-color="green-8"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label caption class="text-grey-8">
                  <q-chip
                    class="text-white text-capitalize"
                    label="Confirmed"
                    color="positive"
                    v-if="appointment.status == 'confirmed'"
                  ></q-chip>
                  <q-chip
                    class="text-white text-capitalize"
                    label="Canceled"
                    color="negative"
                    v-if="appointment.status == 'canceled'"
                  ></q-chip>
                  <q-chip
                    class="text-white text-capitalize"
                    label="Pending"
                    color="warning"
                    v-if="appointment.status == 'pending'"
                  ></q-chip>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              label="Cancel"
              class="text-capitalize q-ma-sm"
              color="red-10"
              v-if="appointment.status == 'pending'"
              @click="canCelAppointment(appointment)"
            />
          </q-card-actions>
        </q-card>
      </q-expansion-item>
    </q-list>
    <q-card class="q-mt-xl" v-if="!loading && appointments.length == 0">
      <q-item-label header class="text-center">
        No Appointment available
      </q-item-label>
    </q-card>

    <!-- Bottom Button -->
    <q-page-sticky position="bottom" class="q-mb-lg" offset="[18, 18]">
      <q-btn
        label="Book Appointment"
        color="primary"
        class="full-width"
        @click="bookAppointment"
      />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useAppointment } from 'stores/appointment'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const storeAppointment = useAppointment();
const appointments = ref([]);
const loading = ref(false);
const router = useRouter()
const $q = useQuasar()

// Call the function when the component is mounted
onMounted(() => {
  getAppointmentLists();
});

const getAppointmentLists = () => {
    storeAppointment.getAppointments().then((response) => {
        appointments.value = response.data.data
        loading.value = false;
    })
}

const bookAppointment = () => {
    router.push({ name: 'patients.book-apointment'});
}

const canCelAppointment = (appointment) => {
    loading.value = true;
    storeAppointment.cancelAppointment(appointment.id).then((response) => {
        // Show success notification
        $q.notify({
            type: 'positive', // 'positive' for success message
            message: 'Cancel Appointment successful!',
            timeout: 3000, // Duration in milliseconds
            position: 'top-right' // You can choose different positions
        });
        getAppointmentLists();

    })
}
</script>
<template>
  <q-page class="q-pa-sm">

    <q-card class="q-mt-sm no-shadow" bordered>
      <q-card-section class="row">
        <div class="text-h6 text-weight-bolder text-grey-8">
          Notifications
        </div>
        <q-space></q-space>
        <!-- <q-btn class="text-capitalize" outline label="Add Friend" color="indigo-7"></q-btn> -->
      </q-card-section>
      <q-separator></q-separator>
      <q-list v-if="notifications.length > 0">
        <q-item clickable v-ripple
            v-for="notification in notifications"
            :key="notification.id"
         >
          <q-item-section avatar>
            <q-avatar>
              <img :src="notification.owner?.profile_image ?? '/notification.png'">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">

                <q-chip color="teal" text-color="white" icon="check" v-if="notification.type == 'confirmed'">
                    Appointment for {{notification.appointment.date}} is confirmed
                </q-chip>

                <q-chip color="orange" text-color="white" icon="error" v-if="notification.type == 'canceled'">
                    Appointment for {{notification.appointment.date}} is canceled
                </q-chip>
            </q-item-label>
            <q-item-label caption lines="2" v-if="notification.type == 'confirmed'">
              <span class="text-weight-bold">{{notification.owner?.name}}</span>
              -- Your appointment has been successfully confirmed! We look forward to seeing you at the scheduled time. If you have any questions or need to make changes, please don't hesitate to reach out
            </q-item-label>

            <q-item-label caption lines="2" v-if="notification.type == 'canceled'">
              <span class="text-weight-bold">{{notification.owner?.name}}</span>
              -- Your appointment has been canceled. If you need to reschedule or have any questions, please feel free to contact us or Book again. We're here to help!
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            {{notification.created}}
          </q-item-section>
        </q-item>

        <q-separator inset="item"/>
      </q-list>

    <q-card class="q-mt-xl" v-if="notifications.length == 0">
      <q-item-label header class="text-center">
        No Appointment available
      </q-item-label>
    </q-card>
    </q-card>

  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useAppointment } from 'stores/appointment'

const storeAppointment = useAppointment();
const notifications = ref([]);
const loading = ref(false);

// Call the function when the component is mounted
onMounted(() => {
  getAppointmentLogs();
});

const getAppointmentLogs = () => {
    storeAppointment.appontmentLogs().then((response) => {
      if (response?.data?.data) {
        notifications.value = response.data.data
        loading.value = false;
        console.log(notifications.value)

      }
    })
}

</script>

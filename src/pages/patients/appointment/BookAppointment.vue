<template>
  <q-page padding>
    <q-card flat bordered class="q-pa-md" style="max-width: 600px;" v-if="!isBookAppointment">
      <q-card-section>
        <div class="text-h6">Appointment Booking</div>
      </q-card-section>

      <q-form @submit="submitForm" class="q-gutter-md">
        <!-- Clinic Select -->
        <q-select
            v-model="form.clinic_id"
            :options="clinics"
            label="Clinic"
            filled
            dense
            emit-value
            map-options
            placeholder="Select a Clinic"
            :error="!!errors.clinic_id"
            :error-message="errors.clinic_id?.[0]"
        />

        <!-- Date Picker -->

            <q-input 
                filled 
                v-model="form.date" 
                dense
                mask="####/##/##"
                placeholder="YYYY/MM/DD"
                readonly
                :rules="['date']"
                :error="!!errors.date"
                :error-message="errors.date?.[0]"
            >
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.date" :options="dateOptions">
                        <div class="row items-center justify-end">
                            <q-btn label="Cancel" color="primary" flat v-close-popup />
                            <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
                        </div>
                        </q-date>
                    </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>

        <!-- Doctor Select -->
        <q-select
            v-model="form.doctor_id"
            :options="doctors"
            label="Doctor"
            filled
            dense
            emit-value
            map-options
            placeholder="Select a Doctor"
            :error="!!errors.doctor_id"
            :error-message="errors.doctor_id?.[0]"
        />

        <!-- Slot Select -->
        <q-select
            v-model="form.slot"
            :options="slots"
            label="Time Slot"
            filled
            dense
            emit-value
            map-options
            placeholder="Select a Slot"
            :error="!!errors.slot"
            :error-message="errors.slot?.[0]"
        />

        <!-- Reason for Booking -->
        <q-input
            v-model="form.reason"
            label="Reason for Booking"
            type="textarea"
            filled
            dense
            placeholder="Describe the reason for booking..."
            :error="!!errors.reason"
            :error-message="errors.reason?.[0]"
        />

        <div v-if="errors.general" class="text-negative text-center q-mt-md">
        {{ errors.general }}
        </div>
        <!-- Submit Button -->
        <q-btn type="submit" label="Book Appointment" color="primary" class="full-width" />
      </q-form>
    </q-card>
    <!-- Conditional rendering for success message -->
    <q-card-section v-else>
        <div class="text-center q-pt-lg">
        <q-icon name="check_circle" size="56px" color="green" />
        <div class="text-h6 q-mt-md">
            Book Appointment successful!
        </div>
        <div class="text-subtitle2 q-mt-sm">
            Redirecting to Dashboard page...
        </div>
        </div>
    </q-card-section>
  </q-page>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useClinic } from 'stores/clinic'
import { useDoctor } from 'stores/doctor'
import { useTimeSLot } from 'stores/timeslot'
import { useAppointment } from 'stores/appointment'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

const storeClinic = useClinic();
const storeDoctor = useDoctor();
const storeTimeSlot = useTimeSLot();
const storeAppointment = useAppointment();
const $q = useQuasar()
const router = useRouter()
const route = useRoute();

const clinics = ref([]);
const doctors = ref([]);
const slots = ref([]);
const isBookAppointment = ref(false)

// Reactive form object
const form = reactive({
    clinic_id: null,
    date: null,
    doctor_id: null,
    slot: null,
    reason: '',
});

// Reactive form object
const errors = reactive({
    clinic_id: null,
    date: null,
    doctor_id: null,
    slot: null,
    reason: null,
    general: null
});

const dateOptions = (value) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const today = `${year}/${month}/${day}`;
    
    return value >= today;
};

// Method to submit the form
const submitForm = () => {
    clearErrors()
    storeAppointment.bookAppointment(form).then((response) => {

    // Show success notification
    $q.notify({
        type: 'positive', // 'positive' for success message
        message: 'Book Appointment successful!',
        timeout: 3000, // Duration in milliseconds
        position: 'top-right' // You can choose different positions
    });

    isBookAppointment.value =  true;
    setTimeout(() => {
          router.push({ name: 'patients.apointment-list' })
    }, 3500);

    }).catch(error => {
        console.log('error :', error);
        if (error.errors) {
            errors.clinic_id = error.errors.clinic_id || null
            errors.date = error.errors.date || null
            errors.doctor_id = error.errors.doctor_id || null
            errors.slot = error.errors.slot || null
            errors.reason = error.errors.reason || null
        } else {
            errors.general = error.message || 'Booking failed. Please try again.'
        }

    })
};

const clearErrors = () => {
        errors.clinic_id =  null
        errors.date =  null
        errors.doctor_id =  null
        errors.slot = null
        errors.reason = null
        errors.general = null
}

// Call the function when the component is mounted
onMounted(() => {
  getClinicList();
  if (route.params.doctorName && route.params.doctorId) {
    form.doctor_id = {
            label: route.params.doctorName ?? null,
            value: route.params.doctorId ?? null
        }
  }
});


watch(
    () => [form.clinic_id, form.date,  form.doctor_id],
    ([clinic_id, date, doctor_id]) => {
        if (clinic_id && date && doctor_id) {
            fetchTimeSlot();
        } else if (clinic_id && date) {
            fetchDoctor();
        }
    }
);


const fetchTimeSlot = () => {
    slots.value = [];
    storeTimeSlot.getAvailableTimeSlot(form.clinic_id, form.doctor_id, form.date).then((response) => {
        if (response.data.data.length == 0) {
            errors.slot = ["No Slot available for that date"]
        }
        slots.value = response.data.data.map(slot => ({
            label: slot.start + ' - ' + slot.end,
            value: slot.id
        }));
    })
};

const fetchDoctor = () => {
    doctors.value = [];

    storeDoctor.getAvailableDoctors(form.clinic_id, form.date).then((response) => {
        doctors.value = response.data.data.map(doctor => ({
            label: doctor.name,
            value: doctor.id
        }));

        if (doctors.value.length > 0) {
            form.doctor_id = doctors.value[0].value;
        } else {
            errors.date = ["No Doctor available for that date"]
        }
    })
};

const getClinicList = async () => {
  try {
    const response = await storeClinic.getClinicList();

    // Populate the clinics array with the response data
    clinics.value = response.data.data.map(clinic => ({
      label: clinic.name,
      value: clinic.id
    }));
    
    setTimeout(() => {
        if (clinics.value.length > 0) {
            form.clinic_id = clinics.value[0].value;
        }
    }, 500);
  } catch (error) {
    console.error('Error fetching clinics:', error);
  }
};

</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>

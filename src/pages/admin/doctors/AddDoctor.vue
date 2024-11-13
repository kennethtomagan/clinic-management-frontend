<template>
  <div>
    <PageHeader
      title="Patient Details"
      :breadcrumbs="[
        { label: 'Users', icon: 'people', to: '/admin/patients' },
        { label: 'User Details', icon: 'person' }
      ]"
    />

    <div class="q-pa-md">
      <q-card class="user-form" >
        <q-card-section>
          <!-- Profile Image Section -->
          <div class="row justify-center q-mb-lg">
            <div class="col-12 col-md-4 text-center">
              <div class="profile-image-container">
                <q-avatar size="200px" class="shadow-3  q-mb-md">
                  <img :src="user.profile_image" v-if="user.profile_image" :key="user.profile_image">
                  <q-icon name="person" size="180px" v-else />
                </q-avatar>
                    <q-file 
                        color="primary" bg-color="info" 
                        label="Change Photo" 
                        standout
                        v-model="user.avatar"
                        @update:model-value="handleUpload"
                        rounded 
                        use-button
                        style="max-width: 180px"
                        :error="!!errors.avatar"
                        :error-message="errors.avatar?.[0]"
                        @change="errors.avatar = null"
                    >
                        <template v-slot:prepend>
                        <q-icon name="cloud_upload" />
                        </template>
                    </q-file>
              </div>
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <!-- First Name -->
            <div class="col-12 col-md-6">
              <q-input
                v-model="user.first_name"
                label="First Name"
                :error="!!errors.first_name"
                :error-message="errors.first_name?.[0]"
                 dense outlined 
              />
            </div>

            <!-- Last Name -->
            <div class="col-12 col-md-6">
              <q-input
                v-model="user.last_name"
                label="Last Name"
                :error="!!errors.last_name"
                :error-message="errors.last_name?.[0]"
                @change="errors.last_name = null"
                dense outlined 
              />
            </div>

            <!-- Gender -->
            <div class="col-12 col-md-6">
              <q-select
                v-model="user.gender"
                :options="['Male', 'Female']"
                label="Gender"
                :error="!!errors.gender"
                :error-message="errors.gender?.[0]"
                @change="errors.gender = null"
                dense outlined 
              />
            </div>

            <!-- Date of Birth -->
            <div class="col-12 col-md-6">
              <q-input
                v-model="user.date_of_birth"
                label="Date of Birth"
                type="date"
                dense outlined 
                :error="!!errors.date_of_birth"
                :error-message="errors.date_of_birth?.[0]"
                @change="errors.date_of_birth = null"
              />
            </div>

            <!-- Email -->
            <div class="col-12 col-md-6">
              <q-input
                v-model="user.email"
                label="Email Address"
                type="email"
                :error="!!errors.email"
                :error-message="errors.email?.[0]"
                @change="errors.email = null"
                dense outlined 
              />
            </div>

            <!-- Phone -->
            <div class="col-12 col-md-6">
              <q-input
                v-model="user.phone"
                label="Phone"    
                :error="!!errors.phone"
                :error-message="errors.phone?.[0]"            
                @change="errors.phone = null"
                dense outlined 
              />
            </div>

            <!-- address -->
            <div class="col-12 col-md-6">
              <q-input
                v-model="user.address"
                :error="!!errors.address"
                :error-message="errors.address?.[0]"  
                @change="errors.address = null"
                label="Address"
                dense outlined 
              />
            </div>

            <!-- RFID Number -->
            <div class="col-12 col-md-6">
              <q-input
                v-model="user.rfid_number"
                label="RFID Number"
                dense outlined 
              />
            </div>

            <!-- Clinic -->
              <div class="col-12 col-md-6">
                <q-select
                    v-model="user.clinic_id"
                    :options="clinics"
                    label="Clinic"
                    dense outlined 
                    emit-value
                    map-options
                    placeholder="Select a Clinic"
                    :error="!!errors.clinic_id"
                    :error-message="errors.clinic_id?.[0]"
                />
              </div>

            <!-- Status -->
            <div class="col-12 col-md-6">
              <q-select 
                  v-model="user.status"
                  :options="['active', 'leave', 'resigned']"
                  label="Status" 
                  lazy-rules
                  dense outlined 
                  :error="!!errors.status"
                  :error-message="errors.status?.[0]"
                  @change="errors.status = null"
              />
            </div>

            <!-- Education -->
            <div class="col-12 col-md-6">
              <q-input
                v-model="user.education"
                :error="!!errors.education"
                :error-message="errors.education?.[0]"  
                @change="errors.education = null"
                label="Education"
                dense outlined 
              />
            </div>

            <!-- Specialization -->
            <div class="col-12 col-md-6">
              <q-input
                v-model="user.specialization"
                :error="!!errors.specialization"
                :error-message="errors.specialization?.[0]"  
                @change="errors.specialization = null"
                label="Specialization"
                dense outlined 
              />
            </div>

            <!-- Subspecialty -->
            <div class="col-12 col-md-6">
              <q-input
                v-model="subspecialty"
                :error="!!errors.subspecialty"
                :error-message="errors.subspecialty?.[0]"  
                @change="errors.subspecialty = null"
                label="Subspecialty"
                @keyup.enter="addSubspecialty"
                hint="Press Enter to add new subspecialty."
                dense outlined 
              />
              <div class="q-mt-sm">
                <q-chip
                  v-for="(subspecialty, index) in user.subspecialty"
                  :key="index"
                  removable
                  color="teal"
                  text-color="white"
                  @remove="removeSubspecialty(index)"
                >
                  {{ subspecialty }}
                </q-chip>
              </div>
            </div>


            <!-- Years of Experience -->
            <div class="col-12 col-md-6">
              <q-input
                v-model="user.years_of_experience"
                :error="!!errors.years_of_experience"
                :error-message="errors.years_of_experience?.[0]"  
                @change="errors.years_of_experience = null"
                label="Years of experience"
                dense outlined 
                type="number"
              />
            </div>

            <!-- New Password -->
            <div class="col-12 col-md-6">
              <q-input
                v-model="user.password"
                label="Password"
                :type="isPwd ? 'password' : 'text'"
                dense outlined 
                :error="!!errors.password"
                :error-message="errors.password?.[0]"  
                @change="errors.password = null"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>

            <!-- Confirm Password -->
            <div class="col-12 col-md-6">
              <q-input
                v-model="user.confirm_password"
                label="Confirm Password"
                :type="isPwd ? 'password' : 'text'"
                dense outlined 
                :error="!!errors.confirm_password"
                :error-message="errors.confirm_password?.[0]"  
                @change="errors.confirm_password = null"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn label="Cancel" color="negative" flat to="/admin/patients" />
          <q-btn label="Save" color="primary" @click="savePatient"/>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import PageHeader from '../components/PageHeader.vue'
import { useRouter, useRoute } from 'vue-router'
import { useClinic } from 'stores/clinic'
import { useDoctor } from 'stores/doctor'

const $q = useQuasar()
const isPwd = ref(true)
const profileImage = ref(null)
const profileImageUrl = ref('')
const fileInput = ref(null)
const loading = ref(false)
const route = useRoute();
const router = useRouter();
const image = ref(null);
const storeClinic = useClinic();
const clinics = ref([]);
const subspecialty = ref(null);
const storeDoctor = useDoctor();

const user = reactive({
        first_name: null,
        last_name: null,
        gender: null,
        date_of_birth: null,
        phone: null,
        address: null,
        email: null, 
        rfid_number: null, 
        password: null,
        confirm_password: null,
        avatar: null,
        education:null,
        specialization:null,
        subspecialty: null,
        years_of_experience: null,
        status: null,
        clinic_id: null
})

const errors = reactive({
        first_name: null,
        last_name: null,
        gender: null,
        date_of_birth: null,
        phone: null,
        address: null,
        email: null, 
        password: null,
        confirm_password: null,
        avatar: null,
        specialization:null,
        subspecialty: null,
        years_of_experience: null,
        status: null,
        clinic_id: null
})


const handleUpload = (file) => {
    if (file) {

      // Clear any previous object URL to avoid memory leaks
      if (user.profile_image) {
        URL.revokeObjectURL(user.profile_image)
      }

      user.profile_image = URL.createObjectURL(file);
    }
}

const addSubspecialty = () => {
    const value = subspecialty.value.trim()
    if (value && !user.subspecialty.includes(value)) {
      user.subspecialty.push(value)
    }
    subspecialty.value = ''
}

const removeSubspecialty = (index) => {
  user.subspecialty.splice(index, 1)
}

const savePatient = () => {
  loading.value = true

    // const formData = new FormData();
    // if (image.value) {
    //     formData.append('avatar', image.value);
    // }

    // formData.append('first_name', user.first_name);
    // formData.append('last_name', user.last_name);
    // formData.append('gender', user.gender);
    // formData.append('email', user.email);
    // formData.append('phone', user.phone);
    // formData.append('address', user.address);
    // formData.append('date_of_birth', user.date_of_birth);
    // formData.append('rfid_number', user.rfid_number);
    // formData.append('password', user.password);
    // formData.append('confirm_password', user.confirm_password);

    storeDoctor.createDoctor(user).then((response) => {
        loading.value = false
        $q.notify({
            type: 'positive',
            message: 'Profile updated successfuly!',
            timeout: 3000,
            position: 'top-right'
        });

        router.push({ name: 'admin.doctors.edit',  params: { id: response.data.data.id }})

    }).catch(error => {
        // PROCESSING
        loading.value = false
        // If error.response.data contains validation errors
        if (error.errors) {
            // Assign specific field errors
            errors.email = error.errors.email || null
            errors.password = error.errors.password || null
            errors.confirm_password = error.errors.confirm_password || null
            errors.first_name = error.errors.first_name || null
            errors.last_name = error.errors.last_name || null
            errors.gender = error.errors.gender || null
            errors.date_of_birth = error.errors.date_of_birth || null
            errors.phone = error.errors.phone || null
            errors.address = error.errors.address || null
            errors.image = error.errors.avatar || null
            errors.education = error.errors.education || null
            errors.specialization = error.errors.specialization || null
            errors.subspecialty = error.errors.subspecialty || null
            errors.years_of_experience = error.errors.years_of_experience || null
            errors.status = error.errors.status || null
            errors.clinic_id = error.errors.clinic_id || null
        } else {
        // If the error is a general error (e.g., authentication error)
            $q.notify({
                type: 'negative',
                message: error.message || 'Update failed. Please try again.',
                timeout: 3000,
                position: 'top-right'
            });
        }
    })
}


const getClinicList = async () => {
  try {
    const response = await storeClinic.getClinicList();

    // Populate the clinics array with the response data
    clinics.value = response.data.data.map(clinic => ({
      label: clinic.name,
      value: clinic.id
    }));
    
  } catch (error) {
    console.error('Error fetching clinics:', error);
  }
};


onMounted(() => {
  getClinicList();
});


</script>

<style scoped>
.user-form {
  max-width: 1200px;
  margin: 0 auto;
}

.profile-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-image-actions {
  margin-top: 1rem;
}

.q-avatar {
  background-color: #f5f5f5;
}
</style>
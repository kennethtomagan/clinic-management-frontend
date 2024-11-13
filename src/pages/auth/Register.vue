<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}" style="margin-top:100px; margin-bottom: 50px;">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Register
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" v-if="!isRegistered">

              <q-input
                dense outlined
                v-model="form.first_name"
                label="First name"
                lazy-rules
                :error="!!errors.first_name"
                :error-message="errors.first_name?.[0]"
                @change="errors.first_name = null"
              />

              <q-input
                dense outlined
                v-model="form.last_name"
                label="Last name"
                lazy-rules
                :error="!!errors.last_name"
                :error-message="errors.last_name?.[0]"
                @change="errors.last_name = null"
              />


            <q-select 
                v-model="form.gender" 
                :options="['Male', 'Female']"
                label="Gender" 
                lazy-rules
                dense outlined
                :error="!!errors.gender"
                :error-message="errors.gender?.[0]"
                @change="errors.gender = null"
            />
            <q-input 
                dense outlined 
                v-model="form.date_of_birth" 
                mask="date" 
                :rules="['date']"
                :error="!!errors.date_of_birth"
                :error-message="errors.date_of_birth?.[0]"
                @change="errors.date_of_birth = null"
            >
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.date_of_birth">
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                        </q-date>
                    </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>

            <q-input
                v-model="form.phone"
                label="Phone Number"
                mask="#### ### ####"
                dense outlined
                prepend="🇵🇭 +63"
                hint="Format: XXXX XXX XXXX"
                :rules="[val => val.length === 13 || 'Please enter a valid phone number']"
                :error="!!errors.phone"
                :error-message="errors.phone?.[0]"
                @change="errors.phone = null"
            >
            <template v-slot:append>
                <q-icon name="phone" />
            </template>
            </q-input>

              <q-input
                dense outlined
                v-model="form.address"
                label="Address"
                lazy-rules
                :error="!!errors.address"
                :error-message="errors.address?.[0]"
                @change="errors.address = null"
              />

              <q-input
                dense outlined
                v-model="form.email"
                label="email"
                lazy-rules
                :error="!!errors.email"
                :error-message="errors.email?.[0]"
                @change="errors.email = null"
              />
                
            <q-input 
                v-model="form.password" 
                :error="!!errors.password"
                :error-message="errors.password?.[0]"
                @change="errors.password = null"
                label="Password"
                dense outlined 
                :type="showPassword ? 'password' : 'text'">
                <template v-slot:append>
                    <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                    />
                </template>
            </q-input>

            <q-input 
                v-model="form.confirm_password" 
                label="Confirm Password"
                dense outlined 
                :error="!!errors.confirm_password"
                :error-message="errors.confirm_password?.[0]"
                @change="errors.confirm_password = null"
                :type="showConfirmPassword ? 'password' : 'text'">
                <template v-slot:append>
                    <q-icon
                    :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showConfirmPassword = !showConfirmPassword"
                    />
                </template>
            </q-input>

              <!-- General error message (e.g., for authentication errors) -->
              <div v-if="errors.general" class="text-negative text-center q-mt-md">
                {{ errors.general }}
              </div>
              <!-- Add the Login button and Register link inline -->
              <div class="row items-center justify-between">
                <q-btn
                  label="Register" to="/" type="button" color="primary"
                  :disable="processingForm"
                  @click.prevent="register()"
                />
                <!-- Register link on the right -->
                <q-btn
                  flat
                  label="Login"
                  color="secondary"
                  class="q-ml-sm"
                  to="/login" 
                />
              </div>
            </q-form>

            <!-- Conditional rendering for success message -->
            <q-card-section v-else>
                <div class="text-center q-pt-lg">
                <q-icon name="check_circle" size="56px" color="green" />
                <div class="text-h6 q-mt-md">
                    Registration successful!
                </div>
                <div class="text-subtitle2 q-mt-sm">
                    Redirecting to login page...
                </div>
                </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useUser } from 'stores/auth'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const storeUser = useUser()
const dateNow = new Date();
const year = dateNow.getFullYear();
const month = String(dateNow.getMonth() + 1).padStart(2, '0');
const day = String(dateNow.getDate()).padStart(2, '0');
const $q = useQuasar()

const form = reactive({ 
        first_name: null,
        last_name: null,
        gender: null,
        date_of_birth:  `${year}/${month}/${day}`,
        phone: null,
        address: null,
        email: null, 
        password: null,
        confirm_password: null
    })
const processingForm = ref(false)
const showPassword = ref(true)
const showConfirmPassword = ref(true)
const isRegistered = ref(false)

// Define a reactive object to store errors
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
        general: null
})

const register = () => {
  processingForm.value = true
  storeUser.registerAction(form).then((token) => {
    // Show success notification
    $q.notify({
        type: 'positive', // 'positive' for success message
        message: 'Registration successful! Please log in.',
        timeout: 3000, // Duration in milliseconds
        position: 'top-right' // You can choose different positions
    });
    isRegistered .value =  true;
    setTimeout(() => {
      router.push({ name: 'login' })
    }, 2500);
  }).catch(error => {
    // PROCESSING
    processingForm.value = false
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
    } else {
      // If the error is a general error (e.g., authentication error)
      errors.general = error.message || 'Register failed. Please try again.'
    }

  })
}

</script>

<style>

.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>

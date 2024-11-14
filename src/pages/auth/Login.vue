<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" @submit="login()" ref="loginForm">
              <q-input
                filled
                v-model="form.email"
                label="email"
                lazy-rules
                :error="!!errors.email"
                :error-message="errors.email?.[0]"
              />

              <q-input
                filled
                v-model="form.password"
                label="Password"
                lazy-rules
                :error="!!errors.password"
                :error-message="errors.password?.[0]"
                :type="showPassword ? 'password' : 'text'">
                <template v-slot:append>
                    <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
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
                  label="Login"  type="submit" color="primary"
                  @click="submitForm"
                  :disable="processingForm"
                />
                <!-- Register link on the right -->
                <q-btn
                  flat
                  label="Register"
                  color="secondary"
                  class="q-ml-sm"
                  to="/register" 
                />
              </div>
            </q-form>
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

const router = useRouter()
const storeUser = useUser()
const form = reactive({ email: null , password: null })
const processingForm = ref(false)
const showPassword = ref(true)

// Define a reactive object to store errors
const errors = reactive({
  email: null,
  password: null,
  general: null
})
const submitForm = () => {
      this.$refs.loginForm.submit();
}

const login = () => {
  processingForm.value = true
  storeUser.loginAction(form).then((token) => {
        storeUser.getAuthUser().then((user) => {
            if (user.type == 'patient') {
                router.push({ name: 'patients.dashboard' })
            } else {
                router.push({ name: 'dashboard' })
            }
        }) 
  }).catch(error => {
    // PROCESSING
    processingForm.value = false
    // If error.response.data contains validation errors
    if (error.errors) {
      // Assign specific field errors
      errors.email = error.errors.email || null
      errors.password = error.errors.password || null
    } else {
      // If the error is a general error (e.g., authentication error)
      errors.general = error.message || 'Login failed. Please try again.'
    }

  })
}
</script>

<style>

.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>

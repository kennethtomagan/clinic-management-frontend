<template>
    
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white no-shadow" bordered>
          <q-card-section class="text-h6 ">
            <div class="text-h6">Edit Profile</div>
            <div class="text-subtitle2">Complete your profile</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section side>
                  <q-avatar size="100px">
                    <img :src="profile.profile_image" v-if="profile.profile_image">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-file 
                        color="lime-11" bg-color="info" 
                        label="Add Photo" 
                        standout
                        v-model="image"
                        @update:model-value="handleUpload"
                        rounded 
                        use-button
                        style="max-width: 150px"
                        :error="!!errors.image"
                        :error-message="errors.image?.[0]"
                    >
                        <template v-slot:prepend>
                        <q-icon name="cloud_upload" />
                        </template>
                    </q-file>
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input 
                    dark
                    color="white"
                    dense
                    v-model="profile.first_name"
                    label="First Name"
                    :error="!!errors.first_name"
                    :error-message="errors.first_name?.[0]"
                />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="profile.last_name"
                    label="Last Name"
                    :error="!!errors.last_name"
                    :error-message="errors.last_name?.[0]"
                />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="profile.email"
                    label="Email Address"
                    :error="!!errors.email"
                    :error-message="errors.email?.[0]"
                />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="profile.phone"
                    label="Phone number"
                    :error="!!errors.phone"
                    :error-message="errors.phone?.[0]"
                />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    autogrow
                    dense
                    v-model="profile.address"
                    label="Address"
                    :error="!!errors.address"
                    :error-message="errors.address?.[0]"
                />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                    <q-select
                        :options="['Male',
                        'Female']"
                        dark
                        color="white"
                        dense
                        v-model="profile.gender"
                        label="Gender"
                        :error="!!errors.address"
                        :error-message="errors.address?.[0]"
                    />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>

                    <q-input 
                        label="Date of birth"
                        dark color="white"  
                        dense 
                        v-model="profile.date_of_birth" 
                        mask="date" 
                        :rules="['date']"
                        :error="!!errors.date_of_birth"
                        :error-message="errors.date_of_birth?.[0]"
                    >
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="profile.date_of_birth">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-date>
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>

                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn 
                class="text-capitalize bg-info text-white" 
                :disable="loading"
                @click="updateProfile"
            >Update User Info</q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white no-shadow" bordered>
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">Change Password</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                Current Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                    type="password"
                    dark
                    dense
                    outlined
                    color="white"
                    round
                    v-model="password.current_password"
                    :error="!!errors.current_password"
                    :error-message="errors.current_password?.[0]"
                    @change="errors.current_password = null"
                    label="Current Password"/>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                New Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                    type="password"
                    dark
                    dense
                    outlined
                    color="white"
                    round
                    v-model="password.new_password"
                    :error="!!errors.new_password"
                    :error-message="errors.new_password?.[0]"
                    @change="errors.new_password = null"
                    label="New Password"
                />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                Confirm New Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input type="password" dark dense outlined round color="white"
                         v-model="password.new_password_confirmation"
                        :error="!!errors.new_password_confirmation"
                        :error-message="errors.new_password_confirmation?.[0]"
                        @change="errors.new_password_confirmation = null"
                         label="Confirm New Password"/>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn 
                @click="updatePassword"
                class="text-capitalize bg-info text-white"
                :disable="loading"

            >Change Password</q-btn>
          </q-card-actions>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useUser } from 'stores/auth';
import { useQuasar, QSpinnerGears } from 'quasar'

const storeUser = useUser();
const profile = storeUser.currentUser;
const password = reactive({
        current_password: null,
        new_password: null,
        new_password_confirmation: null,

});
const image = ref(null);
const $q = useQuasar()
const loading = ref(false)

const errors = reactive({
        first_name: null,
        last_name: null,
        gender: null,
        date_of_birth: null,
        phone: null,
        address: null,
        email: null, 
        current_password: null,
        new_password: null,
        new_password_confirmation: null,
        general: null,
        image: null
})

// Call the function when the component is mounted
onMounted(() => {
    // profile.value = storeUser.currentUser;
});


const handleUpload = () => {
    if (image.value) {
        profile.profile_image = URL.createObjectURL(image.value);
    }
}

const updatePassword = () => {
    loading.value = true
    const formData = new FormData();
    formData.append('current_password', password.current_password);
    formData.append('new_password', password.new_password);
    formData.append('new_password_confirmation', password.new_password_confirmation);
    formData.append('_method', 'PUT');

    storeUser.updateUserPassword(formData).then((response) => {
        loading.value = false
        $q.notify({
            type: 'positive',
            message: 'Password updated successfuly!',
            timeout: 3000,
            position: 'top-right'
        });

        password.current_password = null
        password.new_password = null
        password.new_password_confirmation = null

    }).catch(error => {
        // PROCESSING
        loading.value = false
        // If error.response.data contains validation errors
        if (error.errors) {
            errors.current_password = error.errors.current_password || null
            errors.new_password = error.errors.new_password || null
            errors.new_password_confirmation = error.errors.new_password_confirmation || null
        } else {

            $q.notify({
                type: 'negative',
                message: error.error || 'Update failed. Please try again.',
                timeout: 3000,
                position: 'top-right'
            });
        }

    });
};

const updateProfile = () => {
    loading.value = true

    const formData = new FormData();
    if (image.value) {
        formData.append('avatar', image.value);
    }

    formData.append('first_name', profile.first_name);
    formData.append('last_name', profile.last_name);
    formData.append('gender', profile.gender);
    formData.append('email', profile.email);
    formData.append('phone', profile.phone);
    formData.append('address', profile.address);
    formData.append('date_of_birth', profile.date_of_birth);
    formData.append('_method', 'PUT');

    storeUser.updateUserProfile(formData).then((response) => {
        loading.value = false
        $q.notify({
            type: 'positive',
            message: 'Profile updated successfuly!',
            timeout: 3000,
            position: 'top-right'
        });
        storeUser.getAuthUser();

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
    

</script>

<style scoped>

.card-bg {
  background-color: #162b4d;
}
</style>
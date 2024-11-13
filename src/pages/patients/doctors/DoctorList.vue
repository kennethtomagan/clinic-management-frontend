<template>
  <q-page class="q-pa-sm bg-white">
    <q-resize-observer @resize="onResize"/>

    <div class="row" v-if="!$q.screen.lt.sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card class="no-shadow" bordered>
          <q-tab-panels v-model="tab" animated class="bg-white">
            <q-tab-panel name="all" class="q-pa-none full-height" :style="{'height':size['height']-80+'px !important'}">
              <q-list class="">
                <!-- <q-item-label class="text-center q-pa-sm">
                  <q-input dense rounded outlined v-model="search">
                    <template v-slot:append>
                      <q-icon name="search"/>
                    </template>
                  </q-input>
                </q-item-label> -->
                <q-item-label header class="text-center">{{ doctors.length }} Doctors</q-item-label>


                <span v-for="(doctor, index) in doctors" :key="index" @click="selected_doctor=doctor">
                  <contact-item
                    :avatar="doctor.profile_image" 
                    :name="doctor.name" 
                    :position="doctor.doctor_detail.specialization"
                ></contact-item>
                </span>

              </q-list>
            </q-tab-panel>

            <!-- <q-tab-panel name="favorites" class="q-pa-none" :style="{'height':size['height']-80+'px !important'}">
              <q-list class="">

                <q-item-label class="text-center q-pa-sm">
                  <q-input dense rounded outlined v-model="search">
                    <template v-slot:append>
                      <q-icon name="search"/>
                    </template>
                  </q-input>
                </q-item-label>
                <q-item-label header class="text-center">{{ favorites_list.length }} Favorites</q-item-label>

                <span v-for="(favorite, index) in favorites_list" :key="index" @click="selected_doctor=favorite">
                  <contact-item
                    :avatar="favorite.avatar" :name="favorite.name" :position="favorite.position"></contact-item>
                </span>

              </q-list>
            </q-tab-panel> -->

          </q-tab-panels>

          <q-tabs
            v-model="tab"
            dense
            class="bg-grey-3"
            align="justify"
          >
            <q-tab name="all" icon="person" class="text-capitalize" label="All"></q-tab>
            <!-- <q-tab name="favorites" icon="star" class="text-capitalize" label="Favorites"></q-tab> -->
          </q-tabs>
        </q-card>
      </div>
      <div class="col-lg-8 q-pl-xs col-md-8 col-sm-12 col-xs-12">
        <q-card class="no-shadow" bordered :style="{'height':size['height']-24+'px !important'}" v-if="selected_doctor.id">
          <q-toolbar class="text-black ">
            <q-btn round flat class="q-pa-sm">
              <q-avatar size="80px">
                <img :src="selected_doctor.profile_image">
              </q-avatar>
            </q-btn>

            <q-item class="q-subtitle-1 q-pl-md">
              <q-item-section>
                <q-item-label lines="1">{{ selected_doctor.name }}</q-item-label>
                <q-item-label caption lines="2">
                  <span class="text-weight-bold">{{ selected_doctor.position }}</span>
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-space/>

            <!-- <q-btn round flat icon="star_outline" color="yellow">
            </q-btn>
            <q-btn round flat icon="edit"/> -->

          </q-toolbar>
          <q-separator></q-separator>

          <div v-for="detail, detail_index in detail_list">

            <contact-detail-item 
                :icon="detail.icon" 
                :text_color="detail.text_color"
                :value="getNestedValue(selected_doctor, detail.field)"
                :label="detail.label">
            </contact-detail-item>

            <q-separator inset="item" v-if="detail_index!=detail_list.length-1"></q-separator>
          </div>

        </q-card>
      </div>
    </div>

    <div v-else>
      <div v-if="Object.keys(selected_doctor).length==0">
        <q-tab-panels v-model="tab" animated class="bg-white">
          <q-tab-panel name="all" class="q-pa-none full-height" :style="{'height':size['height']-100+'px !important'}">
            <q-list class="">

              <q-item-label class="text-center q-pa-sm">
                <q-input dense rounded outlined v-model="search">
                  <template v-slot:append>
                    <q-icon name="search"/>
                  </template>
                </q-input>
              </q-item-label>
              <q-item-label header class="text-center">{{ doctors.length }} CONTACTS</q-item-label>

              <span v-for="(doctor, index) in doctors" :key="index" @click="selected_doctor=doctor">
                <contact-item
                  :avatar="doctor.profile_image" :name="doctor.name" :position="doctor.doctor_detail.specialization"></contact-item>
              </span>

            </q-list>
          </q-tab-panel>

          <q-tab-panel name="favorites" class="q-pa-none" :style="{'height':size['height']-80+'px !important'}">
            <q-list class="">

              <q-item-label class="text-center q-pa-sm">
                <q-input dense rounded outlined v-model="search">
                  <template v-slot:append>
                    <q-icon name="search"/>
                  </template>
                </q-input>
              </q-item-label>
              <q-item-label header class="text-center">{{ favorites_list.length }} Favorites</q-item-label>

              <span v-for="(favorite, index) in favorites_list" :key="index" @click="selected_doctor=favorite">
                <contact-item
                  :avatar="favorite.avatar" :name="favorite.name" :position="favorite.position"></contact-item>
              </span>

            </q-list>
          </q-tab-panel>

        </q-tab-panels>
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-3"
          align="justify"
        >
          <q-tab name="all" icon="person" class="text-capitalize" label="All"></q-tab>
          <!-- <q-tab name="favorites" icon="star" class="text-capitalize" label="Favorites"></q-tab> -->
        </q-tabs>
      </div>
      <transition v-else
                  appear
                  enter-active-class="animated bounceInRight"
      >
        <q-card class="no-border"
        :style="{'height': size['height'] - 100 + 'px'}"
        v-if="selected_doctor.id"
        style="display: flex; flex-direction: column;">

        <!-- Header Section -->
        <q-toolbar class="text-black">
            <q-btn round flat class="q-pa-sm">
            <q-avatar size="80px">
                <img :src="selected_doctor.profile_image">
            </q-avatar>
            </q-btn>

            <q-item class="q-subtitle-1 q-pl-md">
            <q-item-section>
                <q-item-label lines="1">{{ selected_doctor.name }}</q-item-label>
                <q-item-label caption lines="2">
                <span class="text-weight-bold">{{ selected_doctor.position }}</span>
                </q-item-label>
            </q-item-section>
            </q-item>

            <q-space/>
            <q-btn round flat icon="keyboard_backspace" @click="selected_doctor = {}"/>
        </q-toolbar>
        <q-separator/>

        <!-- Scrollable Content Section -->
        <div style="flex: 1; overflow-y: auto; padding: 16px;">
            <div v-for="(detail, detail_index) in detail_list" :key="detail_index">
            <contact-detail-item 
                :icon="detail.icon" 
                :text_color="detail.text_color"
                :value="getNestedValue(selected_doctor, detail.field)"
                :label="detail.label">
            </contact-detail-item>

            <q-separator inset="item" v-if="detail_index != detail_list.length - 1"></q-separator>
            </div>
        </div>

        <!-- Bottom Button Section -->
        <q-card-actions align="center" style="padding: 16px;">
            <!-- <q-btn type="submit" label="Book Appointment" color="primary" class="full-width"/> -->
              <q-btn 
                label="Book Appointment"
                color="primary"
                class="full-width"
                @click="bookAppointment"
            />
        </q-card-actions>
        </q-card>
      </transition>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { useQuasar } from "quasar";
import { useDoctor } from 'stores/doctor'
import { useRouter } from 'vue-router'

const storeDoctor = useDoctor();
const router = useRouter()

// Define contact and detail lists
const detail_list = [
  { icon: 'mail', label: 'Personal Email', field: 'email', text_color: 'grey-8' },
  { icon: 'phone', label: 'Phone', field: 'phone', text_color: 'grey-8' },
  { icon: 'cake', label: 'Date of birth', field: 'date_of_birth', text_color: 'grey-8' },
  { icon: 'location_on', label: 'Address', field: 'address', text_color: 'grey-8' },
  { icon: 'school', label: 'Education', field: 'doctor_detail.education', text_color: 'grey-8' },
  { icon: 'science', label: 'Specialization', field: 'doctor_detail.specialization', text_color: 'grey-8' },
  { icon: 'vaccines', label: 'Subspecialty', field: 'doctor_detail.subspecialty', text_color: 'grey-8' },
  { icon: 'business_center', label: 'Years of Experience', field: 'doctor_detail.years_of_experience', text_color: 'grey-8' },
  { icon: 'local_hospital', label: 'Clinic', field: 'clinic.name', text_color: 'grey-8' },
];

// Use Quasar and set up component state
const $q = useQuasar();
const tab = ref('all');
const search = ref('');
const size = ref({ width: '200px', height: '200px' });
const selected_doctor = ref({});
const onResize = (size_dynamic) => {
  size.value = size_dynamic;
};
const doctors = ref([]);

// Lazy-load components
const ContactDetailItem = defineAsyncComponent(() => import('components/ContactDetailItem.vue'));
const ContactItem = defineAsyncComponent(() => import('components/ContactItem.vue'));

// Set default selected contact when mounted
onMounted(() => {
    fetchDoctor();
});

const bookAppointment = () => {
    router.push({ 
        name: 'patients.book-apointment', 
        params: { 
            doctorId: selected_doctor.value.id,
            doctorName: selected_doctor.value.name 
        } 
    });
}

const fetchDoctor = () => {
    doctors.value = [];

    storeDoctor.getActiveDoctors().then((response) => {
        doctors.value = response.data.data;
        // selected_doctor.value = doctors.value[0]
    })
};


const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => {
    if (acc && acc[part] !== undefined) {
      return acc[part];
    } else {
      return undefined;
    }
  }, obj);
};

</script>

<style scoped>
/* Add your styles here */
</style>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          Eye Clinic
        </q-toolbar-title>
        <q-space/>
        <div class="q-gutter-sm row items-center no-wrap">
                    <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
                           @click="$q.fullscreen.toggle()"
                           v-if="$q.screen.gt.sm">
                    </q-btn>
          <!-- <q-btn round dense flat color="white" icon="fab fa-github" type="a"
                 href="https://github.com/pratik227/quasar-admin" target="_blank">
          </q-btn>
          <q-btn round dense flat style="color:red !important;" type="a" href="https://github.com/sponsors/pratik227"
                 target="_blank">
            <i class="fa fa-heart fa-2x fa-beat"></i>
          </q-btn> -->
          <!-- <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              5
            </q-badge>
            <q-menu
            >
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense
                         class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn> -->
          <q-btn round flat>
            <q-avatar size="26px">
              <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png"> -->
              <img :src="profile.profile_image" v-if="profile.profile_image">
            </q-avatar>

          <!-- The Dropdown Menu -->
            <q-menu ref="menu" anchor="top right" self="top right" class="profile-dropdown">
              <q-list>
                <q-item clickable @click="goToProfile">
                  <q-item-section>
                    <q-item-label @click="goToProfile">Profile</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable @click="logout">
                  <q-item-section>
                    <q-item-label>Logout</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary text-white"
    >
      <q-list>
        <q-item to="/patients/dashboard" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/patients/book-apointment" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="date_range"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Book Appointment</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/patients/apointment-list" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="list"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Appointments</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/patients/doctor-list" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="medical_services"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Doctors</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/patients/notifications" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="notifications"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Notifications</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/patients/profile" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="person"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
        <section class="q-pt-sm q-pl-sm" v-if="!isPatientsDashboard">
            <q-btn
                flat
                round
                dense
                icon="arrow_back"
                @click="goBack"
                color="primary"
            />
        </section>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import EssentialLink from 'components/EssentialLink.vue'
import Messages from './Messages.vue'
import { useUser } from 'stores/auth';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// State
const leftDrawerOpen = ref(false)
const $q = useQuasar()
const storeUser = useUser();
const profile = storeUser.currentUser;

const isPatientsDashboard = computed(() => {
  return route.name === 'patients.dashboard' || route.path === '/patients/dashboard'
})

onMounted(() => {
  storeUser.getAuthUser();
});

// Methods
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const logout = () => {
  storeUser.logout().then((res) => {
    router.push({ name: 'login' })
  })
};

const goToProfile = () => {
    router.push({ name: 'patients.profile' })
};


const goBack = () => {
  router.back()
}

</script>


<style>

/* FONT AWESOME GENERIC BEAT */
.fa-beat {
  animation: fa-beat 5s ease infinite;
}
.profile-dropdown {
  margin-top: 2.4% !important;
  background-color: var(--q-primary);
  color: #fff;
}

@keyframes fa-beat {
  0% {
    transform: scale(1);
  }
  5% {
    transform: scale(1.25);
  }
  20% {
    transform: scale(1);
  }
  30% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.25);
  }
  50% {
    transform: scale(1);
  }
  55% {
    transform: scale(1.25);
  }
  70% {
    transform: scale(1);
  }
}

</style>

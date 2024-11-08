<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        @click="gotoHomePage"
        label="Go Home"
        no-caps
      />

    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useUser } from 'stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const storeUser = useUser()

const gotoHomePage = () => {
    storeUser.getAuthUser().then((user) => {
        if (user.type == 'patient') {
          router.push({ name: 'patients.dashboard' })
        } else {
          router.push({ name: 'dashboard' })
        }
    }).catch(error => {
        router.push({ name: 'login' })
  })
}


</script>

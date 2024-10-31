<template>
  <q-card class="text-white" :style="{'background-image': background_image}">
    <q-card-section>
      <div class="text-h6 text-center">
        {{ title }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h2 text-weight-bolder text-center">
        <q-icon :name="icon"></q-icon>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <!-- <div class="text-h2 text-weight-bolder text-center">
        {{ price }}
      </div> -->
    </q-card-section>
    <q-card-section>
      <div class="text-h6 text-weight-bolder text-center">
        {{ text }}
      </div>
    </q-card-section>
    <q-card-actions vertical align="center">
      <q-btn 
        @click="goToRoute()"
        outline class="text-capitalize">Visit Page</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Define props using Composition API
const props = defineProps({
  background_image: String,
  title: String,
  icon: String,
  text: String,
  routeName: String,
});

const goToRoute = () => {
    if (props.routeName) {
      router.push({ name: props.routeName})
    }
}
</script>

<style scoped>

</style>

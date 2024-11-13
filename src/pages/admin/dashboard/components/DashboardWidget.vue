<template>
  <q-card class="bg-transparent no-shadow no-border" bordered>
    <q-card-section class="q-pa-none">
      <div class="row q-col-gutter-sm ">
        <div v-for="(item, index) in items" :key="index" class="col-md-3 col-sm-12 col-xs-12">
          <q-item :style="`background-color: ${item.color1}`" class="q-pa-none">
            <q-item-section v-if="icon_position === 'left'" side :style="`background-color: ${item.color2}`"
                            class=" q-pa-lg q-mr-none text-white">
              <q-icon :name="item.icon" color="white" size="24px"></q-icon>
            </q-item-section>
            <q-item-section class=" q-pa-md q-ml-none  text-white">
              <q-item-label class="text-white text-h6 text-weight-bolder">{{ item.value }}</q-item-label>
              <q-item-label>{{ item.title }}</q-item-label>
            </q-item-section>
            <q-item-section v-if="icon_position === 'right'" side class="q-mr-md text-white">
              <q-icon :name="item.icon" color="white" size="44px"></q-icon>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CardSocial",
  props: {
    icon_position: {
      required: false,
      default: "left"
    },
    counts:  {
      required: true,
    }
  },
  computed: {
    items: function () {
      return [
          {
            title: "Doctors",
            icon: "medical_services",
            value: this.counts.doctors,
            color1: "#f37169",
            color1: "#5064b5",
            color2: "#3e51b5"
          },
          {
            title: "Patients",
            icon: "people",
            value: this.counts.patients,
            color1: "#f37169",
            color2: "#f34636"
          },
          {
            title: "Products",
            icon: "badge",
            value: this.counts.products,
            color1: "#ea6a7f",
            color2: "#ea4b64"
          },
          {
            title: "Appointment",
            icon: "event",
            value: this.counts.appointments,
            color1: "#a270b1",
            color2: "#9f52b1"
          }
        ];
    }
  }
})
</script>

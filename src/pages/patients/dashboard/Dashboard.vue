<template>
    <section class="q-pt-lg">
        <q-page padding>

        <section class="q-pb-lg">
            <div class="row q-col-gutter-sm q-px-sm">
            <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12" 
                v-for="pricing_item, pricing_index in pricing_data"
                :key="pricing_item.title"
            >
                <CardItem 
                    :title="pricing_item.title"
                    :icon="pricing_item.icon"
                    :routeName="pricing_item.routeName"
                    :background_image="pricing_item.background_image"
                    :text="pricing_item.text"
                ></CardItem>
            </div>
            </div>
        </section>
            <!-- <q-card
            class="q-mb-md"
            @click="handleCardClick('book-apointment')"
            flat
            bordered
            style="cursor: pointer; background-color: #E3F2FD;"
            >
            <q-card-section>
                <q-icon name="event" size="30px" color="blue-8" />
                <div class="text-h6">Book Appointment</div>
                <div class="text-subtitle1">Schedule a new appointment</div>
            </q-card-section>
            </q-card>

            <q-card
            class="q-mb-md"
            @click="handleCardClick('view-doctors')"
            flat
            bordered
            style="cursor: pointer; background-color: #FFEBEE;"
            >
            <q-card-section>
                <q-icon name="medical_services" size="30px" color="red-8" />
                <div class="text-h6">View Doctors</div>
                <div class="text-subtitle1">Check available doctors</div>
            </q-card-section>
            </q-card>

            <q-card
            class="q-mb-md"
            @click="handleCardClick('check-notification')"
            flat
            bordered
            style="cursor: pointer; background-color: #FFF3E0;"
            >
            <q-card-section>
                <q-icon name="notifications" size="30px" color="orange-8" />
                <div class="text-h6">Check Notification</div>
                <div class="text-subtitle1">View recent notifications</div>
            </q-card-section>
            </q-card>

            <q-card
            class="q-mb-md"
            @click="handleCardClick('view-message')"
            flat
            bordered
            style="cursor: pointer; background-color: #E8F5E9;"
            >
            <q-card-section>
                <q-icon name="message" size="30px" color="green-8" />
                <div class="text-h6">View Message</div>
                <div class="text-subtitle1">Read your messages</div>
            </q-card-section>
            </q-card> -->
        </q-page>
    </section>
</template>
<script setup>
import { useRouter } from 'vue-router'
import CardItem from './components/CardItem.vue'

const router = useRouter()

const pricing_data = [
  {
    title: 'Book Appointment',
    routeName: 'patients.book-apointment',
    icon: 'event',
    background_image: 'linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)',
    text: 'Schedule a new appointment.'
  },
  {
    title: 'View Doctors',
    routeName: 'patients.doctors',
    icon: 'medical_services',
    background_image: 'linear-gradient(-225deg, #5D9FFF 0%, #6BBBFF 100%)',
    text: 'Check doctors details'
  },
  {
    title: 'Check Notification',
    routeName: null,
    icon: 'notifications',
    background_image: 'linear-gradient(to right, #2B86C5 0%, #2B86C5 100%)',
    text: 'View recent notifications.'
  },
  {
    title: 'Appointment List',
    routeName: 'patients.apointment-list',
    icon: 'list',
    background_image: 'linear-gradient(87deg, rgb(17, 205, 239), rgb(17, 113, 239)) !important',
    text: 'Visit appointment history'
  },
]

// const handleCardClick = (menu) => {
//       router.push({ name: 'patients.' + menu })
// }
</script>

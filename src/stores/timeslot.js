import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive, ref } from 'vue';

export const useTimeSLot = defineStore('timeSlot', () => {
    const availableTimeSlot = process.env.API_URL + 'api/time-slot';

    const getAvailableTimeSlot = async (clinicId, doctorId, scheduleDate) => {
        try {
            return await axios.get(availableTimeSlot, {
                params: {
                    clinic_id: clinicId,
                    date: scheduleDate,
                    doctor_id: doctorId,
                },
            });
        } catch (error) {
            throw error.response.data;
        }
    };

    return {
        getAvailableTimeSlot
    };
});
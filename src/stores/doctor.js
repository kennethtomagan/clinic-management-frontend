import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive, ref } from 'vue';

export const useDoctor = defineStore('doctor', () => {
    const allDoctorUrl = process.env.API_URL + 'api/doctors';
    const availableDoctorUrl = process.env.API_URL + 'api/doctors/available-doctors';

    const getAvailableDoctors = async (clinicId, scheduleDate) => {
        try {
            return await axios.get(availableDoctorUrl, {
                params: {
                    clinic_id: clinicId,
                    date: scheduleDate,
                },
            });
        } catch (error) {
            throw error.response.data;
        }
    };

    const getAllDoctors = async () => {
        try {
            return await axios.get(allDoctorUrl);
        } catch (error) {
            throw error.response.data;
        }
    };
    return {
        getAvailableDoctors,
        getAllDoctors
    };
});
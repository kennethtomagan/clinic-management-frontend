import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive, ref } from 'vue';

export const useClinic = defineStore('clinics', () => {
    const clinicsUrl = process.env.API_URL + 'api/clinics';

    const getClinicList = async () => {
        try {
            return await axios.get(clinicsUrl);
        } catch (error) {
            throw error.response.data;
        }
    };

    return {
        getClinicList
    };
});
import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive, ref } from 'vue';

export const useDoctor = defineStore('doctor', () => {
    const doctorsUrl = process.env.API_URL + 'api/doctors';
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

    const getActiveDoctors = async () => {
        try {
            return await axios.get(doctorsUrl + '/active');
        } catch (error) {
            throw error.response.data;
        }
    };

    const getDoctorList = async () => {
        try {
            return await axios.get(doctorsUrl);
        } catch (error) {
            throw error.response.data;
        }
    };

    const getDoctor = async (id) => {
        try {
            return await axios.get(doctorsUrl + '/' + id);
        } catch (error) {
            throw error.response.data;
        }
    };

    const updateDoctor = async ( id, formData) => {
        try {
            return await axios.post(doctorsUrl + '/' + id,  formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            throw error.response.data;
        }
    };

    const createDoctor = async (formData) => {
        try {
            return await axios.post(doctorsUrl,  formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            throw error.response.data;
        }
    };

    return {
        getAvailableDoctors,
        getActiveDoctors,
        getDoctorList,
        getDoctor,
        updateDoctor,
        createDoctor
    };
});
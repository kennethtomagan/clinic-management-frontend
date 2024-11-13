import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive, ref } from 'vue';

export const usePatient = defineStore('patient', () => {
    const patientUrl = process.env.API_URL + 'api/patients';

    const getPatientLists = async (params) => {
        try {
            return await axios.get(patientUrl + '?' + params);
        } catch (error) {
            throw error.response.data;
        }
    };

    const getpatient = async (id) => {
        try {
            return await axios.get(patientUrl + '/' + id);
        } catch (error) {
            throw error.response.data;
        }
    };

    const createPatient = async (formData) => {
        try {
            return await axios.post(patientUrl,  formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            throw error.response.data;
        }
    };

    const updatePatient = async ( id, formData) => {
        try {
            return await axios.post(patientUrl + '/' + id,  formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            throw error.response.data;
        }
    };

    const updatePatientPassword = async ( id, formData) => {
        try {
            return await axios.post(patientUrl + '/' + id + '/update-password',  formData);
        } catch (error) {
            throw error.response.data;
        }
    };

    const deletePatient = async (id) => {
        try {
            return await axios.delete(patientUrl + '/' + id);
        } catch (error) {
            throw error.response.data;
        }
    };

    return {
        getPatientLists,
        getpatient,
        createPatient,
        updatePatient,
        updatePatientPassword,
        deletePatient
    };
});
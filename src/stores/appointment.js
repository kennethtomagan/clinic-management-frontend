import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive, ref } from 'vue';

export const useAppointment = defineStore('appointment', () => {
    const bookAppointmentUrl = process.env.API_URL + 'api/book-appointment';
    const appointmentsUrl = process.env.API_URL + 'api/appointments';
    const appointmentsLogsUrl = process.env.API_URL + 'api/appointments/logs';

    const bookAppointment = async (data) => {
        try {
            return await axios.post(bookAppointmentUrl, data);

        } catch (error) {
            throw error.response.data;
        }
    };

    const getAppointments = async () => {
        try {
            return await axios.get(appointmentsUrl);

        } catch (error) {
            throw error.response.data;
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            return await axios.get(appointmentsUrl + '/' + appointmentId + '/cancel');
        } catch (error) {
            throw error.response.data;
        }
    };

    const appontmentLogs = async () => {
        try {
            return await axios.get(appointmentsLogsUrl);
        } catch (error) {
            throw error.response.data;
        }
    };

    return {
        bookAppointment,
        getAppointments,
        cancelAppointment,
        appontmentLogs
    };
});
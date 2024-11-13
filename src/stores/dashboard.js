import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive, ref } from 'vue';

export const useDashboard = defineStore('dashboard', () => {
    const dashboardUrl = process.env.API_URL + 'api/dashboard-counts';

    const getDashboardCounts = async () => {
        try {
            return await axios.get(dashboardUrl);
        } catch (error) {
            throw error.response.data;
        }
    };

    return {
        getDashboardCounts
    };
});
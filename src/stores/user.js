import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive, ref } from 'vue';

export const useUser = defineStore('user', () => {
    const authUser = process.env.API_URL + 'api/auth/user';

    const getAuthUser = async () => {
        try {
            return await axios.get(authUser);
        } catch (error) {
            throw error.response.data;
        }
    };

    const updateUserProfile = async () => {
        try {
            return await axios.put(authUser + '/profile',  formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            throw error.response.data;
        }
    };
    return {
        getAuthUser,
        updateUserProfile
    };
});
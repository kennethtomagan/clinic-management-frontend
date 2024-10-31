import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive, ref } from 'vue';

export const useUser = defineStore('user', () => {
    const currentUser = reactive({});
    const loginUrl = process.env.API_URL + 'api/auth/login';
    const registerUrl = process.env.API_URL + 'api/auth/register';
    const currentUserUrl = process.env.API_URL + 'api/auth/user';
    const logoutUrl = process.env.API_URL + 'api/auth/logout';

    const loginAction = async (data) => {
        console.log('loginUrl ', loginUrl )
        try {
        const response = await axios.post(loginUrl, data);
        const token = response.data.token;
        if (token) {
            // Since currentUser is a ref, you need to update its value
            currentUser.value = Object.assign({}, { token });
            localStorage.setItem('auth_token', JSON.stringify(token));

            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
        return token;
        } catch (error) {
        console.log('loginUrl error ', error )

        throw error.response.data;
        }
    };

    const registerAction = async (data) => {
        console.log('registerUrl ', loginUrl )

        try {
        const response = await axios.post(registerUrl, data);
     
        return response;
        } catch (error) {
        console.log('registerUrl error ', error )

        throw error.response.data;
        }
    };

    const getAuthUser = async (token) => {
        try {
            // const header = { headers: { Authorization: 'Bearer ' + token } }

            const response = await axios.get(currentUserUrl);
            let user = response?.data?.data
            if (user) {
                // Update the properties of the currentUser object
                Object.assign(currentUser, response.data.data); 
            }

            return currentUser;
        } catch (error) {
            throw error.response.data;
        }
    };

    const logout = async () => {
        try {
            const response = await axios.post(logoutUrl);
            localStorage.removeItem('auth_token');
            return response;
        } catch (error) {
            localStorage.removeItem('auth_token');
            window.location.reload();
        }
    };
    
    return {
        currentUser,
        loginAction,
        registerAction,
        getAuthUser,
        logout
    };
});
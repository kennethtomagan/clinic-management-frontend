import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive, ref } from 'vue';

export const useProduct = defineStore('product', () => {
    const productUrl = process.env.API_URL + 'api/products';

    const getProductList = async (params) => {
        try {
            return await axios.get(productUrl + '?' + params);
        } catch (error) {
            throw error.response.data;
        }
    };

    const getProduct = async (id) => {
        try {
            return await axios.get(productUrl + '/' + id);
        } catch (error) {
            throw error.response.data;
        }
    };


    const addProduct = async (formData) => {
        try {
            return await axios.post(productUrl,  formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            throw error.response.data;
        }
    };


    const updateProduct = async ( id, formData) => {
        try {
            return await axios.post(productUrl + '/' + id,  formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            throw error.response.data;
        }
    };

    const deleteProduct = async (id) => {
        try {
            return await axios.delete(productUrl + '/' + id);
        } catch (error) {
            throw error.response.data;
        }
    };


    return {
        getProductList,
        addProduct,
        getProduct,
        updateProduct,
        deleteProduct
    };
});
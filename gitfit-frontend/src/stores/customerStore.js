import {defineStore} from 'pinia';
import { createCustomer, updateCustomerPassword, fetchCustomer } from '@/api';

export const useCustomerStore = defineStore({
    id: 'customer',
    state: () => ({
        customer: JSON.parse(localStorage.getItem('customer')) || null,
    }),
    actions: {
        async fetchAndSetCustomer(username) {
            try {
                const response = await fetchCustomer(username);
                localStorage.setItem('customer', JSON.stringify(response.data));
                localStorage.setItem('userType', 'Customer');
                this.updateCustomerFromLocalStorage();
            } catch (error) {
                console.error(error);
            }
        },
        async createCustomer(customer) {
            try {
                const response = await createCustomer(customer);
                localStorage.setItem('customer', JSON.stringify(response.data));
                localStorage.setItem('userType', 'Customer');
                this.updateCustomerFromLocalStorage();
                // this.customer = response.data;
                return response;
            } catch (error) {
                return error.response;
            }
        },
        async updateCustomerPassword(username, password) {
            try {
                const response = await updateCustomerPassword(username, password);
                localStorage.setItem('customer', JSON.stringify(response.data));
                this.updateCustomerFromLocalStorage();
                return response;
            } catch (error) {
                return error.response;
            }
        },
        updateCustomerFromLocalStorage() {
            this.customer = JSON.parse(localStorage.getItem('customer'))||null;
        },
    },
});
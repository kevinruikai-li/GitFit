import {defineStore} from 'pinia';
import { createBilling, getBilling, deleteBilling } from '@/api';

export const useBillingStore = defineStore({
    id: 'billing',
    state: () => ({
        billing: JSON.parse(localStorage.getItem('billing')) || null,
    }),
    actions: {
        async createBilling(billing) {
            try {
                const response = await createBilling(billing);
                localStorage.setItem('billing', JSON.stringify(response.data));
                this.updateBillingFromLocalStorage();
                return response;
            } catch (error) {
                return error.response;
            }
        },
        async getBilling(username) {
            try {
                const response = await getBilling(username);
                localStorage.setItem('billing', JSON.stringify(response.data));
                this.updateBillingFromLocalStorage();
                this.billing = response.data;
                return response;
            } catch (error) {
                return error.response;
            }
        },
        async deleteBilling(username) {
            try {
                const response = await deleteBilling(username);
                localStorage.removeItem('billing');
                this.updateBillingFromLocalStorage();
                this.billing = null;
                return response;
            } catch (error) {
                return error.response;
            }
        },
        updateBillingFromLocalStorage() {
            this.billing = JSON.parse(localStorage.getItem('billing'))||null;
        },
    },
});
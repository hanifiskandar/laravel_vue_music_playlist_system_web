import { defineStore } from "pinia";
import axios from "axios";

export const authStore = defineStore("auth",{
    state:() => ({
        authUser: null
    }),

    getters:{
        user: (state) => state.authUser
    },

    actions:{
        getToken(){
            axios
                .get('/sanctum/csrf-cookie')
                .then(response => {
                    console.log('Succesfully create new CSRF token');
                })
                .catch(error => {
                    console.error('Error while retrieving CSRF token:', error);
                });
          },

        async getUserData() {
            const data = await axios.get('/api/user');
            this.authUser = data.data;
        },


        // async getUserData() {
        //     try {
        //         const response = await axios.get('/api/user');
        //         this.authUser = response.data;
        //         return response.data; // Return the user data
        //     } catch (error) {
        //         console.error('Error fetching user data:', error);
        //         // Re-throw the error to handle it in the component
        //     }
        // },

        async logout() {
            console.log('logggggoutttt');
            await axios.post('/logout');
            this.authUser = null;
        }
    }
})
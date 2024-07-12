import { defineStore, storeToRefs } from "pinia";
import api from "./Api";
import { getUsers } from "../services/userService/userApi";
import { useQueryParams } from "../App/composables/useQueryParams";

const { setQueryParams } = useQueryParams();

export const useUserStore = defineStore(
    'users', {
        state: () => ({
            userlist: [],
            user: {},
            errors: {}
        }),

        actions: {

            // GET LIST METHOD
            async getList(active, search) {
                const searchstr = search ? "&search=" + search : "";
                await api
                    .get(getUsers + "?isActive=" + active + searchstr)
                    .then((response) => {
                        this.userlist = response.data;
                    });
            },
            // POST METHOD
            async post(payload) {
                await api
                    .post(getUsers + `?${setQueryParams(payload)}`)
                    .then((response) => {
                        if(response.status == 200) {
                            this.user=response.data;
                            this.resetError();
                            this.userlist.push(response.data);
                        }
                        // this.userlist = response.data;
                    }).catch((error) => {
                        if(error.response.status == 403){
                            const err = {
                               state : error.response.status,
                               message : "You are not allowed to do this action!"
                           };
                           this.errors = err;
                   }else{
                           this.errors = error.response.data.errors;
                   }
                    });
            },

            // PUT METHOD
            async put(payload) {
                await api
                    .put(getUsers + `/${payload.id}?${setQueryParams(payload)}`)
                    .then((response) => {
                        if(response.status == 200) {
                            this.user=response.data;
                            this.resetError();
                            const index = this.userlist.findIndex(item => item.id === payload.id);
                            if (index !== -1) {
                                   this.userlist[index] = this.user;
                               }
                        }
                       
                    }).catch((error) => {
                        if(error.response.status == 403){
                            const err = {
                               state : error.response.status,
                               message : "You are not allowed to do this action!"
                           };
                           this.errors = err;
                   }else{
                           this.errors = error.response.data.errors;
                   }
                    });
            },

              // DELETE METHOD
              async delete(payload) {
                await api
                    .delete(getUsers + `/${payload.id}`)
                    .then((response) => {
                        if(response.status == 200) {
                            this.user=response.data;
                            this.resetError();
                            this.userlist = this.userlist.filter(item => item.id !== payload.id);
                        }
                       
                    }).catch((error) => {
                        if(error.response.status == 403){
                            const err = {
                               state : error.response.status,
                               message : "You are not allowed to do this action!"
                           };
                           this.errors = err;
                   }else{
                           this.errors = error.response.data.errors;
                   }
                    });
            },

            async resetError(){
                this.errors = {}
            }
        }
    }
);
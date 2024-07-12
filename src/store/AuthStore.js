import { defineStore, storeToRefs } from "pinia";
import api from "./Api";
import { getAuth } from "../services/authApi";
import { useQueryParams } from "../App/composables/useQueryParams";
import router from "../router";


const { setQueryParams } = useQueryParams();

export const useAuthStore = defineStore(
    'auths',
    {
        state: () => ({
            auth: {},
            loggedIn: false,
            errors: {}
        }),
 
         actions: {
            async login(payload) {
                      await api
                    .post(getAuth + `?${setQueryParams(payload)}`)
                    .then((response) => {
                        if (response.status == 200) {
                                this.auth = response.data;
                                if(this.auth.authStatus == "Authenticated"){
                                    this.loggedIn = true
                                    localStorage.setItem('token', this.auth.token);
                                }
                            }
                    })
                    .catch((error) => {
                        this.errors = error.response.data.errors;
                    });
            },
            async checkToken() {
                const token = localStorage.getItem("token");
                  await api
                    .get(getAuth + "/findtoken?token=" + token )
                    .then((response) => {
                        this.auth = response.data;
                   
                          if(this.auth.authStatus == "Authenticated"){
                                    this.loggedIn = true
                                    localStorage.setItem('token', this.auth.token);
                                }else{
                                   
                                    this.logOut()
                                }
                     
                    });
            },
            async logOut() {
                localStorage.removeItem('token');
                this.auth = {},
                this.loggedIn= false
                router.push('/')
            }
         }
 
 
    }
)
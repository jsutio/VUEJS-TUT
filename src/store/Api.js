import axios from "axios";
// import router from "../router"

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
});

//Request Interceptor to change Token from localStorage
api.interceptors.request.use(
    config => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  //Response Interceptor if 401 means Unauthorized to remove token
  api.interceptors.response.use(undefined, (error) => {
     
      if(401 === error.response.status){
          localStorage.removeItem("token",null)
   
          router.push("/")
          return Promise.resolve(error.response);
      }else{
          return Promise.reject(error);
      }
  });

export default api;
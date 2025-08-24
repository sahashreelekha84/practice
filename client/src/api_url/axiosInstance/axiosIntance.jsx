
import axios from 'axios'
import { baseUrl } from '../api/api'



const axiosInstance = axios.create({
 baseURL:baseUrl
})

axiosInstance.interceptors.request.use(
    async function(config){
        const token=sessionStorage.getItem("token")||localStorage.getItem("token")
        // console.log("token",token);
        if(token){
            config.headers["x-access-token"]=token
          

        }
        return config
        
    },
    function(err){
        return Promise.reject(err) 
    }
)
export const fetchprofile=(media)=>{
    return baseUrl+`uploads/user/profile_pic/${media}`
}

export default axiosInstance

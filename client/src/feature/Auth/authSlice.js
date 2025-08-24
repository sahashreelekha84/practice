import{createAsyncThunk, createSlice}from '@reduxjs/toolkit'
import axios from 'axios'
import useUserStore from '../../app/useUserStore';
import axiosInstance from '../../api_url/axiosInstance/axiosIntance';



export const fetchsignup=createAsyncThunk('signup/fetchsignup',
    async(data)=>{
        const res=await axios.post(`http://localhost:3005/api/auth/register`,data)
        console.log('Axios response for signin:',res);
        return res?.data
        
    }
)
export const fetchsignin=createAsyncThunk('signin/fetchsignin',
    async(data)=>{
        const res=await axios.post(`http://localhost:3005/api/auth/login`,data)
        console.log('Axios response for signin:',res);
        const username = res?.data?.user?.email;
         localStorage.setItem("token", res.data.token); // store token if needed
            localStorage.setItem("username", res?.data?.user?.email); // store token if needed
           
            useUserStore.getState().setUser({
                username,
              
            });

        return res?.data
        
    }
)
export const fetchverify=createAsyncThunk('verify/fetchverify',
    async(data)=>{
        const res=await axios.post(`http://localhost:3005/api/auth/verifyemail`,data)
        console.log('Axios response for signin:',res);
        return res?.data
        
    }
)
export const fetchresetotp=createAsyncThunk('reset/fetchresetotp',
    async(data)=>{
        const res=await axios.post(`http://localhost:3005/api/auth/resendotp`,data)
        console.log('Axios response for signin:',res);
        return res?.data
        
    }

)
export const fetchdashboard=createAsyncThunk('dashboard/fetchdashboard',
    async()=>{
        const res=await axiosInstance.get(`http://localhost:3005/api/auth/dashboard`)
        console.log('Axios response for signin:',res);
        return res?.data
        
    }
)
const initial_value={
    isLoading:true,
    postValue:[],
    error:null
}
export const Auth=createSlice({
    name:'signup',
    initialState:initial_value,
    extraReducers:(builder)=>{
        builder.addCase(fetchsignup.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(fetchsignup.fulfilled,(state,action)=>{
            console.log("Action for fulfilled",action);
            state.isLoading=false
            state.postValue=action.payload
            state.error=null
            
        })
        builder.addCase(fetchsignup.rejected,(state,action)=>{
            console.log("Action for rejected",action);
            state.isLoading=false
            state.postValue=action.payload
            state.error=null
            
        })
        builder.addCase(fetchsignin.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(fetchsignin.fulfilled,(state,action)=>{
            console.log("Action for fulfilled",action);
            state.isLoading=false
            state.postValue=action.payload
            state.error=null
            
        })
        builder.addCase(fetchsignin.rejected,(state,action)=>{
            console.log("Action for rejected",action);
            state.isLoading=false
            state.postValue=action.payload
            state.error=null
            
        })
          builder.addCase(fetchverify.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(fetchverify.fulfilled,(state,action)=>{
            console.log("Action for fulfilled",action);
            state.isLoading=false
            state.postValue=action.payload
            state.error=null
            
        })
        builder.addCase(fetchverify.rejected,(state,action)=>{
            console.log("Action for rejected",action);
            state.isLoading=false
            state.postValue=action.payload
            state.error=null
            
        })
          builder.addCase(fetchresetotp.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(fetchresetotp.fulfilled,(state,action)=>{
            console.log("Action for fulfilled",action);
            state.isLoading=false
            state.postValue=action.payload
            state.error=null
            
        })
        builder.addCase(fetchresetotp.rejected,(state,action)=>{
            console.log("Action for rejected",action);
            state.isLoading=false
            state.postValue=action.payload
            state.error=null
            
        })
         
        builder.addCase(fetchdashboard.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(fetchdashboard.fulfilled,(state,action)=>{
            console.log("Action for fulfilled",action);
            state.isLoading=false
            state.postValue=action.payload
            state.error=null
            
        })
        builder.addCase(fetchdashboard.rejected,(state,action)=>{
            console.log("Action for rejected",action);
            state.isLoading=false
            state.postValue=action.payload
            state.error=null
            
        })
    }
    
})
export default Auth.reducer
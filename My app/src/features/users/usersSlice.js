import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState=[]
const USER_URL='https://jsonplaceholder.typicode.com/users'

export const fetchUsers=createAsyncThunk('users/fetchUsers',async()=>{
    const response=await axios.get(USER_URL)
    return response.data
})

const usersSlice=createSlice({
    name:'users',
    initialState,
    reducers:{},

    extraReducers(builder)
   {
    builder.addCase(fetchUsers.fulfilled,(state,action)=>
    {
        return action.payload
    }
    )
   }
})

export const selectAllUsers=(state)=>state.users;

export default usersSlice.reducer


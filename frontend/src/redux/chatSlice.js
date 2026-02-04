import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        onlineUsers:[]
    },
    reducers: {
        setOnlineUsers:(state, action) => {
            state.socket = action.payload;
        }
    }
})

export const {setOnlineUsers} = socketSlice.actions;
export default socketSlice.reducer;
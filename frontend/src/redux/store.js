import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import postSlice from './postSlice'
import socketSlice from './socketSlice'
import chatSlice from './chatSlice';
import rtnSlice from './rtnSlice';

const store = configureStore({
    reducer:{
        auth:authSlice,
        post:postSlice,
        socket:socketSlice,
        chat:chatSlice,
        realTimeNotification:rtnSlice
    }
});

export default store;
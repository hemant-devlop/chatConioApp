import { configureStore } from "@reduxjs/toolkit";
import app from './ReduxSlices/app'
export const store=configureStore({
    reducer:{
        app:app,
    },
})
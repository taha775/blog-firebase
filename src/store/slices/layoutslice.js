import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showNavbar: true,
    showFooter: true,
  };


const layoutslice = createSlice({
    name :'layout',
    initialState,
    reducers:{
        hideNavbarAndFooter : (state) =>{
            state.showNavbar =false
            state.showFooter =false
        },
        showNavbarAndFooter :(state) =>{
            state.showNavbar = true
            state.showFooter = true
        }
    }
})



export const {hideNavbarAndFooter,showNavbarAndFooter} = layoutslice.actions

export default layoutslice.reducer


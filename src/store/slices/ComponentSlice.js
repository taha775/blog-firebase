import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,

  };


const componentslice = createSlice({
    name :'component',
    initialState,
    reducers:{
        showComponent :(state)=>{
            state.show = true
        },
        hideComponent :(state) =>{
            state.show = false
        }

        
    }
})



export const {showComponent,hideComponent} = componentslice.actions

export default componentslice.reducer


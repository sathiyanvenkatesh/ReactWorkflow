import { createSlice } from "@reduxjs/toolkit";

export const popupSlice = createSlice({
    name:"popup",
    initialState: { open: false, message: "" },
    reducers: {
        getOpen:(state) => {
            state.open = true;
        },
        getClose:(state) => {
            state.open = false;
        },
        setAlert:(state,action) => {
            state.message = action.payload;
        }

    }
})

export const { getOpen, getClose, setAlert } = popupSlice.actions;
export default popupSlice.reducer;
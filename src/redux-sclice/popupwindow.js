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
        setAlertBox:(state,{payload}) => {
            state.message = payload;
        }
    }
})

export const { getOpen, getClose, setAlertBox } = popupSlice.actions;
export default popupSlice.reducer;
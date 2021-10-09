import { createSlice } from "@reduxjs/toolkit";

export const popupSlice = createSlice({
    name:"popup",
    initialState: { open: false },
    reducers: {
        getOpen:(state) => {
            state.open = true;
        },
        getClose:(state) => {
            state.open = false;
        }
    }
})

export const { getOpen, getClose } = popupSlice.actions;
export default popupSlice.reducer;
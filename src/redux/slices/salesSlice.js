import { createSlice } from '@reduxjs/toolkit';

const initialSalesState = [
  { id: 1, date: '2023-07-24', item: 'Rice', quantitySold: 10, quantityInHand: 13, profit: 13000 },
  { id: 2, date: '2024-05-07', item: 'Rice', quantitySold: 6, quantityInHand: 7, profit: 7800 },
  { id: 3, date: '2024-06-10', item: 'Rice', quantitySold: 5, quantityInHand: 2, profit: 6500 }
];

const salesSlice = createSlice({
  name: 'sales',
  initialState: initialSalesState,
  reducers: {
    addSale: (state, action) => {
      state.push(action.payload);
    }
  }
});

export const { addSale } = salesSlice.actions;
export default salesSlice.reducer;

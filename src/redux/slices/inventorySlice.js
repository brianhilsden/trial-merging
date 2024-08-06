import { createSlice } from '@reduxjs/toolkit';

const initialInventoryState = [
  { id: 1, item: 'Rice', status: 'unpaid', spoilt: 10, stock: 23, unitPrice: 13800, basePrice: 12500 },
  { id: 2, item: 'Beans', status: 'unpaid', spoilt: 5, stock: 40, unitPrice: 19570, basePrice: 18000 },
  { id: 3, item: 'Greengrams', status: 'unpaid', spoilt: 10, stock: 23, unitPrice: 12500, basePrice: 12000 }
];

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: initialInventoryState,
  reducers: {
    addInventory: (state, action) => {
      state.push(action.payload);
    },
    updateInventory: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
  }
});

export const { addInventory, updateInventory } = inventorySlice.actions;
export default inventorySlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    // Add other reducers as needed
  },
});

export const {
  fetchProductsSuccess,
} = productsSlice.actions;

export default productsSlice.reducer;
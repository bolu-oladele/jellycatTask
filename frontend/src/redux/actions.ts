import { Dispatch } from 'redux';
import axios from 'axios';
import { Product, fetchProductsSuccess } from './reducers';

export const fetchProducts = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get<Product[]>('http://localhost:5000/products');
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUsers = createAsyncThunk(
    'users/fetch', 
    async () => {
        const response = await axios.get('https://fakestoreapi.com/users');
        return response.data;
    }
);

export const fetchProducts = createAsyncThunk(
    'products/fetch',
    async () => {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        userList: [],
        isFetched: false,
    },
    reducers: {
        addUser: (state, action) => {
            state.userList.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.userList = action.payload;
            state.isFetched = true;
        });
    },
});

export const { addUser } = usersSlice.actions;

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        productList: [],
        isFetched: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.productList = action.payload;
            state.isFetched = true;
        });
    },
});

const authUserSlice = createSlice({
    name: 'authUser',
    initialState: {
        id: -1,
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.id = action.payload;
        },
    },
});

export const { setAuthUser } = authUserSlice.actions;

const cartSlice = createSlice({
    name: 'cart',
    initialState: [{}],
    reducers: {
        addToCart: (state, action) => {
            const product_found = state.find(item => item.id === action.payload.id);
            if (product_found) {
              product_found.quantity += action.payload.quantity;
            } else {
              state.push(action.payload);
            }
          },
      resetCart: () => {
        return [{}];
      },
    },
  });
  
  export const { addToCart, resetCart } = cartSlice.actions;
  
  const reducer = {
    users: usersSlice.reducer,
    products: productsSlice.reducer,
    authUser: authUserSlice.reducer,
    cart: cartSlice.reducer,
  };
const store = configureStore({ reducer });

export default store;

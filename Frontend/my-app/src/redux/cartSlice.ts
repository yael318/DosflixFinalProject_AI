
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { MovieObject } from '../models/Movie';

// interface CartItem extends MovieObject {
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'myCart',
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<MovieObject>) => {
//       const existingItem = state.items.find(item => item.Id === action.payload.Id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     removeFromCart: (state, action: PayloadAction<number>) => {
//       state.items = state.items.filter(item => item.Id !== action.payload);
//     },
//     increaseQuantity: (state, action: PayloadAction<number>) => {
//       const item = state.items.find(item => item.Id === action.payload);
//       if (item) {
//         item.quantity += 1;
//       }
//     },
//     decreaseQuantity: (state, action: PayloadAction<number>) => {
//       const item = state.items.find(item => item.Id === action.payload);
//       if (item) {
//         if (item.quantity > 1) {
//           item.quantity -= 1;
//         } else {
//           state.items = state.items.filter(i => i.Id !== action.payload);
//         }
//       }
//     },
//   },
// });

// export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
// export { cartSlice };

// export default cartSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieObject } from '../models/Movie';

interface CartItem extends MovieObject {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'myCart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<MovieObject>) => {
      const existingItem = state.items.find(item => item.Id === action.payload.Id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.Id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.Id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.Id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i.Id !== action.payload);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export { cartSlice };

export default cartSlice.reducer;

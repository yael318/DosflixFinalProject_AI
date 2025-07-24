// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../myStore'; // ודאי שהנתיב נכון

// type Role = 'admin' | 'user' | null;

// interface AuthState {
//   isLoggedIn: boolean;
//   role: Role;
//   username: string | null;
//   token: string | null; // 👈 הוספנו את זה
// }

// const initialState: AuthState = {
//   isLoggedIn: false,
//   role: null,
//   username: null,
//   token: null, // 👈 הוספנו את זה
// };

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginUser: (state, action: PayloadAction<{ role: Role; username: string; token: string }>) => {
//       state.isLoggedIn = true;
//       state.role = action.payload.role;
//       state.username = action.payload.username;
//       state.token = action.payload.token; // 👈 שמירה של הטוקן
//     },
//     logout(state) {
//       state.isLoggedIn = false;
//       state.role = null;
//       state.username = null;
//       state.token = null; // 👈 איפוס הטוקן בעת התנתקות
//     },
//   },
// });

// export const { loginUser, logout } = authSlice.actions;
// export default authSlice.reducer;
// export const selectUsername=(state:RootState)=>state.auth.username;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../myStore'; // ודאי שהנתיב נכון
import { clearCart } from './cartSlice'; // ודאי שהנתיב נכון

type Role = 1 | 2 | null;

interface AuthState {
  isLoggedIn: boolean;
  role: Role;
  username: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  role: null,
  username: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ role: Role; username: string; token: string }>) => {
      state.isLoggedIn = true;
      state.role = action.payload.role;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.role = null;
      state.username = null;
      state.token = null;
    },
  },
});

export const { loginUser, logout } = authSlice.actions;

// ✅ הפעולה החדשה – התנתקות + ריקון סל
export const logoutAndClearCart = () => (dispatch: AppDispatch) => {
  dispatch(logout());
  dispatch(clearCart());
};

export default authSlice.reducer;

// סלקטור (אם את משתמשת בו)
export const selectUsername = (state: RootState) => state.auth.username;

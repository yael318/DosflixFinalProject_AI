import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice'; // תוודאי שזה הנתיב הנכון אל הקובץ שלך
import cartSlice from './redux/cartSlice'
// יצירת ה-store הכללי
export const myStore = configureStore({
  reducer: {
    auth: authReducer,
    myCart:cartSlice
  },
    devTools: process.env.NODE_ENV !== 'production',

});

// טיפוסים בשביל TypeScript
export type RootState = ReturnType<typeof myStore.getState>;
export type AppDispatch = typeof myStore.dispatch;
//יכול
export default myStore ;
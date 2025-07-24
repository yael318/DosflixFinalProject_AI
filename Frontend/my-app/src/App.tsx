
import "./App.css";
import React from "react";
import AppContent from "./components/userComponents/AppContent/AppContent";
import { Routes, Route } from "react-router-dom";
import  {LogIn}  from "./components/commonComponents/LogIn/LogIn";
import { Dashboard } from "./components/adminComponents/Dashboard/Dashboard";
import { useSelector } from "react-redux";
import { RootState } from "./myStore";
import AdminScreen from "./components/adminComponents/AdminScreen/AdminScreen";
import Cart from "./components/userComponents/Cart/Cart";
import { SignUp } from "./components/commonComponents/SignUp/SignUp";

const App = () => {
  const user = useSelector((state: RootState) => state.auth);
  const isLoggedIn = user && user.role;

  return (
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/*"
        element={
          isLoggedIn ? (
            user.role === 1 ? (
              <AdminScreen />
            ) : (
              <AppContent />
            )
          ) : (
            <LogIn />
          )
        }
      />
    </Routes>
  );
};

export default App;

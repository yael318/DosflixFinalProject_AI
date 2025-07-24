import React, { FC } from "react";
import "./Cart.scss";
import { useSelector, useDispatch } from "react-redux";
import { MovieObject } from "../../../models/Movie";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../../redux/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // עיצוב ברירת מחדל
import { useNavigate } from "react-router-dom";
import AppContent from "../AppContent/AppContent";
import { IconButton } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

// הרחבת MovieObject עם quantity
interface CartItem extends MovieObject {
  quantity: number;
}

interface CartProps {}

export const Cart: FC<CartProps> = () => {
  const navigate = useNavigate();
  const cart = useSelector(
    (state: { myCart: { items: CartItem[] } }) => state.myCart.items
  );
  const dispatch = useDispatch();

  const handleIncrease = (productId: number) => {
    dispatch(increaseQuantity(productId));
  };
  const handleCheckout = () => {
    // כאן תוכלי לשים מה שתרצי שיקרה כשעוברים לתשלום
    toast.success(`ביצאת הזמנת סרט`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });
    // לדוגמה, ניווט לדף אחר:
    // navigate('/checkout'); אם את משתמשת ב-react-router
  };

  const handleDecrease = (productId: number) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="cart-container mt-[8vh] mb-10 mx-auto max-w-3xl p-8 bg-white rounded-2xl shadow-2xl">
      <h2>עגלת קניות</h2>
      {cart.length === 0 ? (
        <p>הסל שלך ריק</p>
      ) : (
        <div>
          <div className="cart-items">
            {cart.map((product: CartItem) => (
              <div className="cart-item" key={product.Id}>
                <img
                  src={product.Image}
                  alt={product.Name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4>{product.Name}</h4>
                  <p>{product.Description}</p>
                  <p className="cart-item-price">
                    {(product.PriceBase ?? 0 * product.quantity).toFixed(2)} ₪
                  </p>

                  <div className="cart-item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => handleDecrease(product.Id)}
                    >
                      -
                    </button>
                    <span className="quantity">{product.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleIncrease(product.Id)}
                    >
                      +
                    </button>
                  </div>
                  <Box sx={{ position: "relative", marginBottom: 2 }}>
                    <IconButton
                      onClick={() => handleRemove(product.Id)}
                      color="error"
                      sx={{
                        position: "absolute",
                        left: 2,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <strong>סך הכל:</strong> ₪{" "}
            {cart
              .reduce((total: number, item: CartItem) => {
                const price = item.PriceBase ?? 0;
                return total + price * item.quantity;
              }, 0)
              .toFixed(2)}
            <div className="button-row">
              <button className="checkout-btn" onClick={handleCheckout}>
                לצאת לתשלום
              </button>
              <button
                className="back-to-cart"
                onClick={() => navigate("/all-movies")}
              >
                ← המשך לקנות
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

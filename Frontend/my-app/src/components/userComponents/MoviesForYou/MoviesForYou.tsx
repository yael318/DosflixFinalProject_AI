
import { FC, useState } from "react";
import { RootState } from "../../../myStore";
import { useDispatch, useSelector } from "react-redux";
import { MovieObject } from "../../../models/Movie";
import MovieCardUser from "../MovieCardUser/MovieCardUser";
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import { addToCart } from "../../../redux/cartSlice";
import "./MoviesForYou.scss";

interface MoviesForYouProps {
  movies: MovieObject[];
}

const MoviesForYou: FC<MoviesForYouProps> = ({ movies }) => {
  const [showMiniCart, setShowMiniCart] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.myCart.items || []);

  function handleOrderNow(movieId: number) {
    toast.success(`הזמנת סרט "${movieId}"`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });
  }

  function handleAddToCart(movie: MovieObject) {
    dispatch(addToCart(movie));
    setShowMiniCart(true);
    setTimeout(() => {
      setShowMiniCart(false);
    }, 3000);
    console.log('כאן המוצרים')
  }

  return (
    <div
      className="MovieList mt-[8vh]"
      style={{ padding: '10px', maxWidth: '100%', width: '100%' }}
    >
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
        {movies.map((movie) => (
          <Box
            key={movie.Id}
            sx={{
              flexBasis: {
                xs: '100%',
                sm: 'calc(50% - 16px)',
                md: 'calc(33.33% - 16px)',
                lg: 'calc(25% - 16px)',
                xl: 'calc(20% - 16px)',
              },
              maxWidth: '100%',
              minWidth: 250,
            }}
          >
            <MovieCardUser
              movie={movie}
              onOrderNow={handleOrderNow}
              onAddToCart={() => handleAddToCart(movie)}
            />
          </Box>
        ))}
      </Box>

{showMiniCart && (
  <div className="mini-cart-popup">
    <h4>🛒 סל הקניות שלך</h4>
    {cart.map((item: any) => (
      <div key={item.Id} className="mini-cart-item">
        <img src={item.Image} alt={item.Name} className="cart-item-image" />
        <span>{item.Name} x {item.quantity}</span>
      </div>
    ))}
  </div>
)}

    </div>

  );
};

export default MoviesForYou;



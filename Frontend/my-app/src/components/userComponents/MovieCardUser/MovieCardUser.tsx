import React, { FC } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { MovieObject } from "../../../models/Movie";
import { RootState } from "@/myStore";
import { useSelector } from "react-redux";
import { relative } from "path";

interface MovieCardProps {
  movie: MovieObject;
  onOrderNow: (movieId: number) => void;
  onAddToCart: (movieId: number) => void;
}
const MovieCardUser: FC<MovieCardProps> = ({ movie,
  onOrderNow,
  onAddToCart }) => {


  const user = useSelector((state: RootState) => state.auth);

  return (
    <Card
      sx={{
        backgroundColor: '#f8fafc',
        color: '#3e3e3e',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 6,
        borderRadius: 4,
        overflow: 'hidden',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 12,
        }
      }}
    >
      <CardMedia
        component="img"
        height="190"
        image={movie.Image}
        alt={movie.Name}
      />
      <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          dir="rtl"
          sx={{
            color: '#3e3e3e',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {movie.Name}
        </Typography>

        <Box sx={{ height: 80, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <Typography
            variant="body2"
            color="text.secondary"
            dir="rtl"
            sx={{ fontSize: 14, lineHeight: 1.4, color: '#3e3e3e' }}
          >
            {movie.Description}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} dir="rtl">
          <Box display="flex" alignItems="center" gap={0.5}>
            <VisibilityIcon sx={{ fontSize: 18, color: '#3e3e3e' }} />
            <Typography variant="body2" sx={{ fontSize: 13, color: '#3e3e3e' }}>
              {movie.TotalViews}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <AccessTimeIcon sx={{ fontSize: 18, color: '#3e3e3e' }} />
            <Typography variant="body2" sx={{ fontSize: 13, color: '#3e3e3e' }}>
              {movie.LengthMinutes} דקות
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} dir="ltr">
          <Typography
            variant="h6"
            dir="ltr"
            sx={{
             display: 'inline-block',
              px: 1.5,
              py: 0.5,
              backgroundColor: '#b8399a41',
              borderRadius: 1,
              fontWeight: 'bold',
              color: '#3e3e3e',
              fontSize: '0.875rem',
            }}
          >
            ₪{movie.PriceBase}
            לצפייה נוספת 
          </Typography>
          </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={1.5}
          width="100%"
          flexWrap="wrap"          
        >
          <Button
            fullWidth
            size="medium"
            variant="contained"
            onClick={() => onOrderNow(movie.Id)}
            sx={{
              fontWeight: 'bold',
              position: 'relative',
              marginTop: 2,
              px: 2,
              py: 1.2,
              textTransform: 'none',
              boxShadow: '0 4px 12px #c1dbca',
              color: '#3e3e3e',
              backgroundColor: '#f8fafc',
              border: '1px solid #3e3e3e',
              '&:hover': {
                backgroundColor: '#740d5c',
                color: '#f8fafc',
                transform: 'scale(1.03)',
                boxShadow: '0 6px 16px #3e3e3e',
              }
            }}
          >
            הזמן עכשיו
          </Button>

          <Button
            fullWidth
            size="medium"
            variant="outlined"
            startIcon={<ShoppingCartIcon sx={{ ml: 0.5, color: '#740d5c' }} />}
            onClick={() => onAddToCart(movie.Id)}
            sx={{
              fontWeight: 'bold',
              px: 2,
              py: 1.2,
              textTransform: 'none',
              borderColor: '#740d5c',
              color: '#740d5c',
              backgroundColor: '#f8fafc',
              '&:hover': {
                backgroundColor: '#b8399a41',
                transform: 'scale(1.03)',
                boxShadow: '0 6px 16px #3e3e3e',
              }
            }}
          >
            הוסף לעגלה
          </Button>

        </Box>
      </CardActions>
    </Card>
  );
};

export default MovieCardUser;

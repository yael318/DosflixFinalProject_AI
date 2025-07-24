import React, { FC, useState } from "react";
import logo from 'logo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { AppBar, Toolbar, Button, Typography, Tab, Tabs, IconButton, Tooltip, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
//import HomePage from "../HomePage/HomePage";
import { MovieObject, CategoryGroup, AgeGroup } from "../../../models/Movie";
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { Paper, Collapse } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Dashboard } from "../Dashboard/Dashboard";
import { UserCardList } from "../UserCardList/UserCardList";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/authSlice';
import { OrderCardList } from "../OrderCardList/OrderCardList";
import {MovieListAdmin}  from "../MovieListAdmin/MovieListAdmin";
import { selectUsername } from '../../../redux/authSlice';

interface AppContentProps { }
const moviesExemple: MovieObject[] = [
  {
    Id: 10,
    CategoryName: "Children",
    AgeGroupName: "Children",
    HasWoman: true,
    LengthMinutes: 90,
    TotalViews: 120,
    ProductionDate: new Date("2020-06-15"),
    Name: "The Magical Forest",
    Description: "An adventure of a young girl discovering a hidden forest.",
    MovieLink: "https://example.com/magical-forest",
    Image: "https://mikispitzer.com/wp-content/uploads/2021/03/DSC_05652-Edit-Edit-2-300x300.jpg",
    PriceBase: 12.99
  },
  {
    Id: 10,
    CategoryName: "Recipes",
    AgeGroupName: "Adult",
    HasWoman: false,
    LengthMinutes: 45,
    TotalViews: 80,
    ProductionDate: new Date("2018-09-20"),
    Name: "Master Chef Secrets",
    Description: "Top chefs reveal their kitchen secrets.",
    MovieLink: "https://example.com/master-chef",
    Image: "https://mikispitzer.com/wp-content/uploads/2021/03/miki-spitzer-5-1-300x300.jpeg",
    PriceBase: 9.99
  },
  {
    Id: 11,
    CategoryName: "Nature",
    AgeGroupName: "Teens",
    HasWoman: true,
    LengthMinutes: 60,
    TotalViews: 95,
    ProductionDate: new Date("2019-03-12"),
    Name: "Wildlife Wonders",
    Description: "A documentary exploring the wonders of wildlife.",
    MovieLink: "https://example.com/wildlife-wonders",
    Image: "https://mikispitzer.com/wp-content/uploads/2021/03/DSC_03034-Edit-3-300x300.jpg",
    PriceBase: 11.49
  },
  {
    Id: 12,
    CategoryName: "Plot",
    AgeGroupName: "Adult",
    HasWoman: true,
    LengthMinutes: 110,
    TotalViews: 150,
    ProductionDate: new Date("2022-01-10"),
    Name: "The Hidden Truth",
    Description: "A suspenseful thriller uncovering a deep conspiracy.",
    MovieLink: "https://example.com/hidden-truth",
    Image: "https://mikispitzer.com/wp-content/uploads/2021/03/WhatsApp-Image-2021-03-18-at-20.28.32-4-300x300.jpeg",
    PriceBase: 14.99
  },
  {
    Id: 13,
    CategoryName: "Children",
    AgeGroupName: "Babies",
    HasWoman: false,
    LengthMinutes: 30,
    TotalViews: 50,
    ProductionDate: new Date("2021-11-05"),
    Name: "Baby's First Adventure",
    Description: "A fun and educational animation for toddlers.",
    MovieLink: "https://example.com/baby-adventure",
    Image: "https://mikispitzer.com/wp-content/uploads/2023/03/DJI_0599-300x300.jpg",
    PriceBase: 7.99
  },
  {
    Id: 19,
    CategoryName: "Nature",
    AgeGroupName: "GoldenAge",
    HasWoman: true,
    LengthMinutes: 85,
    TotalViews: 70,
    ProductionDate: new Date("2017-05-30"),
    Name: "Serene Landscapes",
    Description: "A calming journey through beautiful landscapes.",
    MovieLink: "https://example.com/serene-landscapes",
    Image: "https://mikispitzer.com/wp-content/uploads/2022/12/DSC_5202-Edit-300x300.jpg",
    PriceBase: 10.99
  },
  {
    Id: 15,
    CategoryName: "Recipes",
    AgeGroupName: "Adult",
    HasWoman: true,
    LengthMinutes: 55,
    TotalViews: 100,
    ProductionDate: new Date("2023-02-18"),
    Name: "Vegan Delights",
    Description: "Learn to cook delicious vegan meals.",
    MovieLink: "https://example.com/vegan-delights",
    Image: "https://mikispitzer.com/wp-content/uploads/2023/07/DSC2490-Edit-3-300x300.jpg",
    PriceBase: 13.49
  },
  {
    Id: 18,
    CategoryName: "Plot",
    AgeGroupName: "Teens",
    HasWoman: false,
    LengthMinutes: 130,
    TotalViews: 200,
    ProductionDate: new Date("2020-08-22"),
    Name: "The Lost Treasure",
    Description: "An action-packed adventure to find a legendary treasure.",
    MovieLink: "https://example.com/lost-treasure",
    Image: "https://mikispitzer.com/wp-content/uploads/2021/06/DSC_2724-Edit-2-300x300.jpg",
    PriceBase: 15.99
  },
  {
    Id: 17,
    CategoryName: "Children",
    AgeGroupName: "Children",
    HasWoman: true,
    LengthMinutes: 75,
    TotalViews: 110,
    ProductionDate: new Date("2016-12-10"),
    Name: "Fairy Tale Chronicles",
    Description: "A magical journey through the world of fairy tales.",
    MovieLink: "https://example.com/fairy-tales",
    Image: "https://mikispitzer.com/wp-content/uploads/2024/04/52-300x300.jpg",
    PriceBase: 14.49
  },
  {
    Id: 14,
    CategoryName: "Recipes",
    AgeGroupName: "Adult",
    HasWoman: false,
    LengthMinutes: 95,
    TotalViews: 25,
    ProductionDate: new Date("2015-04-10"),
    Name: "Cooking with Grandma",
    Description: "A heartwarming look at traditional home-cooked meals.",
    MovieLink: "https://example.com/cooking-with-grandma",
    Image: "https://mikispitzer.com/wp-content/uploads/2023/12/DSC8892-Recovered-300x300.jpg",
    PriceBase: 9.99
  }
];

const AdminScreen: FC<{}> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);

  function handleEditMovie(movie: MovieObject) {
    // פותח דיאלוג עריכה למשל
  }

  function handleDeleteMovie(movieId: number) {
    // מוחק את הסרט
  }

  function handleAddMovie() {
    // פותח דיאלוג הוספת סרט
  }
  const getPageFromPath = (path: string) => {
    switch (path) {
      case '/':
        return 0;
      case '/users':
        return 1;
      case '/orders':
        return 2;
      case 'products':
        return 3;
      default:
        return -1; // שום טאב לא מסומן
    }
  };
  const page = getPageFromPath(location.pathname);
  const func = () => {
    console.log('good!!!')
  }
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    switch (newPage) {
      case 0: navigate('/'); break;
      case 1: navigate('/users'); break;
      case 2: navigate('/orders'); break;
      case 3: navigate('/products'); break;
      default: break;
    }
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar dir="rtl" position="fixed" sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px' }}>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="DosFlix">
              <IconButton onClick={() => navigate('/')} sx={{ color: "#c1dbca" }}>
                <img src={logo} alt="DosFlix Logo" style={{ height: 50, borderRadius: '50%' }} />
              </IconButton>
            </Tooltip>

            {username && (
              <Typography variant="subtitle1" sx={{ color: '#7a7a7a', fontWeight: 'bold' }}>
                שלום, {username}
              </Typography>
            )}
          </Box>
          <Tabs
            value={page >= 0 && page <= 3 ? page : false}
            onChange={handleChange}
            textColor="inherit"
            TabIndicatorProps={{ style: { backgroundColor: '#7a7a7a' } }}
            sx={{
              '& .MuiTab-root': { color: '#666666', fontWeight: 'bold', minWidth: 90 },
              '& .Mui-selected': { color: '#7a7a7a' },
            }}
          >
            <Tab label="ראשי" />
            <Tab label="לקוחות" />
            <Tab label="הזמנות" />
            <Tab label="מוצרים" />
          </Tabs>

          <Tooltip title="התנתקות">
            <IconButton onClick={handleLogout} sx={{ color: "#c1dbca" }}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Container sx={{ flexGrow: 1, marginTop: '2rem', paddingLeft: '2rem', position: 'relative' }} maxWidth={false} disableGutters>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UserCardList />} />
          <Route path="/orders" element={<OrderCardList />} />
          <Route path="/products" element={<MovieListAdmin 
         />} />
        </Routes>
      </Container>
      <Box
        sx={{
          flexShrink: 0,
          textAlign: 'center',
          padding: 2,
          background: '#f5f5f5',
          borderTop: '1px solid #ddd',
        }}
      >
        <Typography variant="body2" color="textSecondary">
          All rights reserved &copy; 2025 | Movies for the Haredi Community | Developed by Programming Group 3 Seminar Beit Yaakov Bnot Elisheva
        </Typography>
      </Box>
    </Box>

  )
}
export default AdminScreen;

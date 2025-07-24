import React, { FC, useState } from "react";
import logo from "logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tab,
  Tabs,
  IconButton,
  Tooltip,
  TextField,
  Badge,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import {
  MovieObject,
  CategoryGroup,
  AgeGroup,
  CategoryGroupType,
  AgeGroupType,
} from "../../../models/Movie";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { Paper, Collapse } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { logout } from "../../../redux/authSlice";
import { loginUser } from "../../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUsername } from "../../../redux/authSlice";
import MovieListUser from "../MovieListUser/MovieListUser";
import Cart from "../Cart/Cart";
import MoviesForYou from "../MoviesForYou/MoviesForYou";
import About from "../About/About";

interface AppContentProps {}

const moviesExemple: MovieObject[] = [
  {
    Id: 4,
    CategoryName: CategoryGroup.Nature,
    AgeGroupName: AgeGroup.Children,
    HasWoman: true,
    LengthMinutes: 90,
    TotalViews: 120,
    ProductionDate: new Date("2020-06-15"),
    Name: "The Magical Forest",
    Description: "An adventure of a young girl discovering a hidden forest.",
    MovieLink: "https://example.com/magical-forest",
    Image:
      "https://mikispitzer.com/wp-content/uploads/2021/03/DSC_05652-Edit-Edit-2-300x300.jpg",
    PriceBase: 12.99,
  },
  {
    Id: 7,
    CategoryName: CategoryGroup.Recipes,
    AgeGroupName: AgeGroup.Adult,
    HasWoman: false,
    LengthMinutes: 45,
    TotalViews: 80,
    ProductionDate: new Date("2018-09-20"),
    Name: "Master Chef Secrets",
    Description: "Top chefs reveal their kitchen secrets.",
    MovieLink: "https://example.com/master-chef",
    Image:
      "https://mikispitzer.com/wp-content/uploads/2021/03/miki-spitzer-5-1-300x300.jpeg",
    PriceBase: 9.99,
  },
  {
    Id: 8,
    CategoryName: CategoryGroup.Nature,
    AgeGroupName: AgeGroup.Teens,
    HasWoman: true,
    LengthMinutes: 60,
    TotalViews: 95,
    ProductionDate: new Date("2019-03-12"),
    Name: "Wildlife Wonders",
    Description: "A documentary exploring the wonders of wildlife.",
    MovieLink: "https://example.com/wildlife-wonders",
    Image:
      "https://mikispitzer.com/wp-content/uploads/2021/03/DSC_03034-Edit-3-300x300.jpg",
    PriceBase: 11.49,
  },
  {
    Id: 5,
    CategoryName: CategoryGroup.Plot,
    AgeGroupName: AgeGroup.Adult,
    HasWoman: true,
    LengthMinutes: 110,
    TotalViews: 150,
    ProductionDate: new Date("2022-01-10"),
    Name: "The Hidden Truth",
    Description: "A suspenseful thriller uncovering a deep conspiracy.",
    MovieLink: "https://example.com/hidden-truth",
    Image:
      "https://mikispitzer.com/wp-content/uploads/2021/03/WhatsApp-Image-2021-03-18-at-20.28.32-4-300x300.jpeg",
    PriceBase: 14.99,
  },
  {
    Id: 2,
    CategoryName: CategoryGroup.Children,
    AgeGroupName: AgeGroup.Babies,
    HasWoman: false,
    LengthMinutes: 30,
    TotalViews: 50,
    ProductionDate: new Date("2021-11-05"),
    Name: "Baby's First Adventure",
    Description: "A fun and educational animation for toddlers.",
    MovieLink: "https://example.com/baby-adventure",
    Image:
      "https://mikispitzer.com/wp-content/uploads/2023/03/DJI_0599-300x300.jpg",
    PriceBase: 7.99,
  },
  {
    Id: 9,
    CategoryName: CategoryGroup.Nature,
    AgeGroupName: AgeGroup.GoldenAge,
    HasWoman: true,
    LengthMinutes: 85,
    TotalViews: 70,
    ProductionDate: new Date("2017-05-30"),
    Name: "Serene Landscapes",
    Description: "A calming journey through beautiful landscapes.",
    MovieLink: "https://example.com/serene-landscapes",
    Image:
      "https://mikispitzer.com/wp-content/uploads/2022/12/DSC_5202-Edit-300x300.jpg",
    PriceBase: 10.99,
  },
  {
    Id: 1,
    CategoryName: CategoryGroup.Recipes,
    AgeGroupName: AgeGroup.Adult,
    HasWoman: true,
    LengthMinutes: 55,
    TotalViews: 100,
    ProductionDate: new Date("2023-02-18"),
    Name: "Vegan Delights",
    Description: "Learn to cook delicious vegan meals.",
    MovieLink: "https://example.com/vegan-delights",
    Image:
      "https://mikispitzer.com/wp-content/uploads/2023/07/DSC2490-Edit-3-300x300.jpg",
    PriceBase: 13.49,
  },
  {
    Id: 10,
    CategoryName: CategoryGroup.Plot,
    AgeGroupName: AgeGroup.Teens,
    HasWoman: false,
    LengthMinutes: 130,
    TotalViews: 200,
    ProductionDate: new Date("2020-08-22"),
    Name: "The Lost Treasure",
    Description: "An action-packed adventure to find a legendary treasure.",
    MovieLink: "https://example.com/lost-treasure",
    Image:
      "https://mikispitzer.com/wp-content/uploads/2021/06/DSC_2724-Edit-2-300x300.jpg",
    PriceBase: 15.99,
  },
  {
    Id: 11,
    CategoryName: CategoryGroup.Children,
    AgeGroupName: AgeGroup.Children,
    HasWoman: true,
    LengthMinutes: 75,
    TotalViews: 110,
    ProductionDate: new Date("2016-12-10"),
    Name: "Fairy Tale Chronicles",
    Description: "A magical journey through the world of fairy tales.",
    MovieLink: "https://example.com/fairy-tales",
    Image: "https://mikispitzer.com/wp-content/uploads/2024/04/52-300x300.jpg",
    PriceBase: 14.49,
  },
  {
    Id: 12,
    CategoryName: CategoryGroup.Recipes,
    AgeGroupName: AgeGroup.Adult,
    HasWoman: false,
    LengthMinutes: 95,
    TotalViews: 25,
    ProductionDate: new Date("2015-04-10"),
    Name: "Cooking with Grandma",
    Description: "A heartwarming look at traditional home-cooked meals.",
    MovieLink: "https://example.com/cooking-with-grandma",
    Image:
      "https://mikispitzer.com/wp-content/uploads/2023/12/DSC8892-Recovered-300x300.jpg",
    PriceBase: 9.99,
  },
];

const AppContent: FC<AppContentProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const cartCount = useSelector((state: any) => state.myCart.items.length);
  const username = useSelector(selectUsername);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  type ChatMessage = {
    text: string;
    time: string;
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newChatMessage: ChatMessage = {
      text: newMessage.trim(),
      time: timeString,
    };

    setChatMessages((prev) => [...prev, newChatMessage]);
    setNewMessage("");
  };

  // הקלטה של הודעה חדשה
  const handleNewMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewMessage(event.target.value);
  }; //רגע הניתובים של המנהל כן עובדים?
  // הפונקציה מחזירה את האינדקס של הטאב לפי הנתיב, או -1 אם לא מתאים
  const getPageFromPath = (path: string) => {
    switch (path) {
      case "/all-movies":
        return 0;
      case "/for-you":
        return 1;
      case "/about":
        return 2;
      default:
        return -1; // שום טאב לא מסומן
    }
  };

  const page = getPageFromPath(location.pathname);


  const Orders = () => <div>ההזמנות שלך</div>;
 

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleChange = (event: React.SyntheticEvent, newPage: number) => {
    switch (newPage) {
      case 0:
        navigate("/all-movies");
        break;
      case 1:
        navigate("/for-you");
        break;
      case 2:
        navigate("/about");
        break;
      default:
        break;
    }
  };

  return (
    <Box
      dir="rtl"
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#fff", boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="DosFlix">
              <IconButton
                onClick={() => navigate("/")}
                sx={{ color: "#c1dbca" }}
              >
                <img
                  src={logo}
                  alt="DosFlix Logo"
                  style={{ height: 50, borderRadius: "50%" }}
                />
              </IconButton>
            </Tooltip>

            {username && (
              <Typography
                variant="subtitle1"
                sx={{ color: "#7a7a7a", fontWeight: "bold" }}
              >
                שלום, {username}
              </Typography>
            )}
          </Box>

          <Tabs
            value={page >= 0 && page <= 2 ? page : false}
            onChange={handleChange}
            textColor="inherit"
            TabIndicatorProps={{ style: { backgroundColor: "#7a7a7a" } }}
            sx={{
              "& .MuiTab-root": {
                color: "#666666",
                fontWeight: "bold",
                minWidth: 90,
              },
              "& .Mui-selected": { color: "#7a7a7a" },
            }}
          >
            <Tab label="כל הסרטים" />
            <Tab label="במיוחד בשבילך" />
            <Tab label="אודות" />
          </Tabs>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="ההזמנות שלך">
              <IconButton
                onClick={() => navigate("/orders")}
                sx={{ color: "#c1dbca" }}
              >
                <ReceiptIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="צ'אט">
              <IconButton onClick={toggleChat} sx={{ color: "#c1dbca" }}>
                <ChatIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="עגלת קניות">
              <IconButton
                onClick={() => navigate("/cart")}
                sx={{ color: "#c1dbca" }}
              >
                <Badge badgeContent={cartCount} color="error" max={99}>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="התנתקות">
              <IconButton onClick={handleLogout} sx={{ color: "#c1dbca" }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          flexGrow: 1,
          marginTop: "2rem",
          paddingLeft: "2rem",
          position: "relative",
        }}
        maxWidth={false}
        disableGutters
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/all-movies"
            element={<MovieListUser movies={moviesExemple} />}
          />
          <Route path="/for-you" element={<MoviesForYou movies={moviesExemple}/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <Collapse
          in={isChatOpen}
          sx={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 320,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#fff",
            zIndex: 1300,
          }}
        >
          <Paper
            elevation={3}
            sx={{ p: 2, height: 400, display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="h6">צ'אט</Typography>
              <IconButton size="small" onClick={toggleChat}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                mb: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {chatMessages.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  ברוכים הבאים לצ'אט! איך אפשר לעזור?
                </Typography>
              ) : (
                chatMessages.map((msg, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      backgroundColor: "rgba(193, 219, 202, 0.5)",
                      borderRadius: 1,
                      p: 1,
                    }}
                  >
                    <Typography variant="body2">{msg.text}</Typography>
                    <Typography
                      variant="caption"
                      sx={{ textAlign: "right", color: "gray" }}
                    >
                      {msg.time}
                    </Typography>
                  </Box>
                ))
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="כתוב הודעה..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newMessage.trim() !== "") {
                    handleSendMessage();
                  }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#c1dbca",
                    },
                    "&:hover fieldset": {
                      borderColor: "#c1dbca",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#75bba0",
                    },
                  },
                }}
              />
              <IconButton
                color="primary"
                disabled={newMessage.trim() === ""}
                onClick={handleSendMessage}
                sx={{
                  color: newMessage.trim() === "" ? "gray" : "#c1dbca",
                  "&:hover": {
                    backgroundColor:
                      newMessage.trim() === ""
                        ? "transparent"
                        : "rgba(193, 219, 202, 0.5)",
                  },
                }}
              >
                <SendIcon
                  sx={{
                    transform: "rotate(180deg)",
                    color: newMessage.trim() === "" ? "gray" : "#c1dbca",
                  }}
                />
              </IconButton>
            </Box>
          </Paper>
        </Collapse>
      </Container>

      <Box
        sx={{
          flexShrink: 0,
          textAlign: "center",
          padding: 2,
          background: "#f5f5f5",
          borderTop: "1px solid #ddd",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          All rights reserved &copy; 2025 | Movies for the Haredi Community |
          Developed by Programming Group 3 Seminar Beit Yaakov Bnot Elisheva
        </Typography>
      </Box>
    </Box>
  );
};

export default AppContent;

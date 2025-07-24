import React, { useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  IconButton,
  Collapse,
  Box,
  Divider,
} from "@mui/material";
import { Phone, Email, ExpandMore, ExpandLess } from "@mui/icons-material";
import { User, Gender, AgeGroup } from "../../../models/User";
import { Order } from "../../../models/Order";
import OrdersModal from "../../userComponents/OrdersModal/OrdersModal";
import { Button } from "@mui/material";

interface UserCardProps {
  user: User & { ProfileImageUrl?: string };
  getOrders: (userId: number) => Promise<Order[]>;
}

export function UserCard({ user, getOrders }: UserCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [ordersDialogOpen, setOrdersDialogOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleExpandClick = () => setExpanded(!expanded);

  const handleShowOrders = async () => {
    const data = await getOrders(user.Id);
    setOrders(data);
    setOrdersDialogOpen(true);
  };

  const mainColor = "#008B8B"; // טורקיז כהה

  return (
    <Card
      sx={{
        width: 280,
        p: 3,
        borderRadius: 3,
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      <Avatar
        src={user.ProfileImageUrl}
        sx={{
          width: 80,
          height: 80,
          mb: 2,
          bgcolor: mainColor,
          fontSize: 32,
          color: "white",
        }}
      >
        {user.ProfileImageUrl ? null : user.Name?.[0] || "?"}
      </Avatar>

      <Typography variant="h6" fontWeight="bold" color={mainColor}>
        {user.Name}
      </Typography>

      {/* טלפון */}
      <Box display="flex" alignItems="center" gap={1} mt={1}>
        <Phone sx={{ fontSize: 18, color: mainColor }} />
        <Typography variant="body2">{user.Phone}</Typography>
      </Box>

      {/* מייל */}
      <Box display="flex" alignItems="center" gap={1}>
        <Email sx={{ fontSize: 18, color: mainColor }} />
        <Typography variant="body2">{user.Email}</Typography>
      </Box>

      {/* כפתור חץ להרחבה */}
      <IconButton onClick={handleExpandClick} sx={{ mt: 1, color: mainColor }}>
        {expanded ? <ExpandLess /> : <ExpandMore />}
      </IconButton>

      {/* פרטים מורחבים */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider sx={{ my: 1 }} />
        {user.Address && (
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            {user.Address}
          </Typography>
        )}
        <Typography variant="body2">
          {user.Gender === Gender.female ? "נקבה" : "זכר"} | {
            user.AgeGroup === AgeGroup.Adult
              ? "מבוגר"
              : user.AgeGroup === AgeGroup.GoldenAge
                ? "גיל הזהב"
                : user.AgeGroup === AgeGroup.Teens
                  ? "נוער"
                  : user.AgeGroup === AgeGroup.Children
                    ? "ילד"
                    : "תינוק"
          }
        </Typography>
      </Collapse>

      <Button
        onClick={handleShowOrders}
        variant="contained"
        sx={{
          mt: 2,
          textTransform: "none",
          backgroundColor: mainColor,
          borderRadius: 2,
          px: 3,
          "&:hover": {
            backgroundColor: "#00a3a3",
          },
        }}
      >
        הצג הזמנות
      </Button>

  
      {ordersDialogOpen && (
  <>
    {/* רקע מטושטש מאחורי המודל */}
    <div className="fixed inset-0 backdrop-blur-sm bg-white/40 z-40"></div>

    {/* תוכן המודל עצמו */}
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full relative">
        <button
          onClick={() => setOrdersDialogOpen(false)}
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>
        <OrdersModal
          isOpen={true}
          onClose={() => setOrdersDialogOpen(false)}
          orders={orders}
        />
      </div>
    </div>
  </>
)}

    </Card>
  );
}

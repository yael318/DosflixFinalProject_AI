import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState, useRef, useEffect } from "react";

interface Message {
  sender: "manager" | "provider";
  text: string;
  timestamp: Date;
}

const providers = ["סינמה ישראל", "סטודיו מובי", "סרטים פלוס"];

export default function ChatBox({ onClose }: { onClose: () => void }) {
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [messagesPerProvider, setMessagesPerProvider] = useState<
    Record<string, Message[]>
  >({});
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleProviderChange = (event: SelectChangeEvent<string>) => {
    setSelectedProvider(event.target.value);
  };

  const sendMessage = () => {
    if (!input.trim() || !selectedProvider) return;
    const newMessage: Message = {
      sender: "manager",
      text: input,
      timestamp: new Date(),
    };
    setMessagesPerProvider((prev) => ({
      ...prev,
      [selectedProvider]: [...(prev[selectedProvider] || []), newMessage],
    }));
    setInput("");
  };

  const messages = messagesPerProvider[selectedProvider] || [];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Box
      width={300}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // מונע גלילה חיצונית
      }}
    >
      <FormControl
        fullWidth
        variant="outlined"
        sx={{
          mt: 2,
          direction: "rtl",
          '& label': {
            left: 'auto',
            right: 29,
            transformOrigin: 'right',
          },
          '& legend': {
            textAlign: 'right',
          },
          '& .MuiSelect-icon': {
            right: 'auto',
            left: 7,
          },
          '& .MuiOutlinedInput-input': {
            textAlign: 'right',
          },
        }}
      >
        <InputLabel id="unit-select-label">בחר ספק</InputLabel>
        <Select
          labelId="unit-select-label"
          value={selectedProvider}
          onChange={handleProviderChange}
          label="בחר ספק"
        >
          {providers.map((unit) => (
            <MenuItem key={unit} value={unit} dir="rtl">
              {unit}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedProvider ? (
        <>
          <Paper
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 2,
              mb: 2,
              height: 150, // גובה קבוע כדי שתהיה רק גלילה פנימית
              direction: "rtl",
              textAlign: "left",
            }}
          >

            {messages.map((msg, idx) => {
              const isManager = msg.sender === "manager";
              return (
                <Box
                  key={idx}
                  display="flex"
                  justifyContent={isManager ? "flex-end" : "flex-start"}
                  mb={1}
                  textAlign="right"
                  dir="rtl"
                >
                  <Box
                    sx={{
                      bgcolor: isManager ? "#b2ebf2" : "#eeeeee",
                      px: 2,
                      py: 1,
                      borderRadius: 3,
                      maxWidth: "100%",
                    }}
                  >
                    <Typography variant="body2">{msg.text}</Typography>
                    <Typography
                      variant="caption"
                      color="gray"
                      sx={{ display: "block", textAlign: "right" }}
                    >
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
            <div ref={messagesEndRef} />
          </Paper>

          <Box display="flex" dir="rtl">
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`כתוב הודעה ל${selectedProvider}...`}
              inputProps={{ style: { textAlign: "right" } }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <IconButton
              onClick={sendMessage}
              color={input.trim() ? "primary" : "default"}
              sx={{ ml: 1 }}
              disabled={!input.trim()}
            >
              <SendIcon sx={{ transform: "rotate(180deg)" }} />
            </IconButton>
          </Box>
        </>
      ) : (
        <Typography variant="body1" color="text.secondary">
          אנא בחר ספק כדי להתחיל שיחה.
        </Typography>
      )}
    </Box>
  );
}

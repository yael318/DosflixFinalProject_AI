import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Box, Typography } from "@mui/material";
import ChatBox from "../ChatBox/ChatBox";

interface ChatWidgetProps {
    chatActive: boolean;
    setChatActive: (value: boolean) => void;
}

export default function ChatWidget({ chatActive, setChatActive }: ChatWidgetProps) {
    return (
        <Box sx={{ height: "100%", position: "relative", direction: "rtl" }}>
            {chatActive ? (
                <>
                    <Box sx={{ position: "absolute", top: 0, left:0 }}>
                        <IconButton onClick={() => setChatActive(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ pt: 4 }}> 
                        <ChatBox onClose={() => setChatActive(false)} />
                    </Box>
                </>
            ) : (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <IconButton
                        onClick={() => setChatActive(true)}
                        sx={{
                            bgcolor: "#00bcd4",
                            color: "white",
                            width: 72,
                            height: 72,
                            borderRadius: "50%",
                            "&:hover": { bgcolor: "#0097a7" },
                        }}
                    >
                        <ChatIcon sx={{ fontSize: 36 }} />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
}
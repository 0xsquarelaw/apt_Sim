import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";

interface Message {
  role: "user" | "ai";
  text: string;
}

const AiIntegration = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Switch to JSON format
      const response = await fetch("http://localhost:8000/input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Failed to get response: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage: Message = { role: "ai", text: data.response || data };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f4f4",
      }}
    >
      <Paper
        elevation={5}
        style={{
          width: "100%",
          maxWidth: 500,
          padding: 16,
          borderRadius: 16,
          background: "#ffffff",
        }}
      >
        <List
          style={{
            maxHeight: 400,
            overflowY: "auto",
            padding: 8,
            borderRadius: 12,
            background: "#fafafa",
          }}
        >
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ListItem
                style={{
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <ListItemText
                  primary={msg.text}
                  style={{
                    backgroundColor:
                      msg.role === "user" ? "#1976d2" : "#e0e0e0",
                    color: msg.role === "user" ? "#fff" : "#000",
                    padding: 12,
                    borderRadius: 12,
                    maxWidth: "75%",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </ListItem>
            </motion.div>
          ))}
        </List>
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 16,
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={loading}
            variant="outlined"
            style={{ borderRadius: 12, background: "#fff" }}
          />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{ borderRadius: 12, padding: "10px 20px" }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Send"
              )}
            </Button>
          </motion.div>
        </div>
      </Paper>
    </motion.div>
  );
};

export default AiIntegration;

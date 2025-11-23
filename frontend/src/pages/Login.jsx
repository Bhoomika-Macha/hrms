import { useState } from "react";
import api from "../services/api";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/employees";
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Card elevation={4} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ fontWeight: 600, mb: 3 }}
          >
            HRMS Login
          </Typography>

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 2, borderRadius: 2, py: 1.3 }}
              type="submit"
            >
              Login
            </Button>
          </Box>

          <Typography textAlign="center" sx={{ mt: 2, fontSize: 15 }}>
            Don't have an organization?{" "}
            <a href="/register" style={{ textDecoration: "none" }}>
              Register Here
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;

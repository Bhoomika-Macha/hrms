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

function RegisterOrg() {
  const [orgName, setOrgName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        orgName,
        adminName,
        email,
        password,
      });
      alert("Organisation created! Please login.");
      window.location.href = "/";
    } catch {
      alert("Error registering organization");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card elevation={4} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ fontWeight: 600, mb: 3 }}
          >
            Create Organisation
          </Typography>

          <Box component="form" onSubmit={register}>
            <TextField
              label="Organisation Name"
              fullWidth
              margin="normal"
              onChange={(e) => setOrgName(e.target.value)}
            />

            <TextField
              label="Admin Name"
              fullWidth
              margin="normal"
              onChange={(e) => setAdminName(e.target.value)}
            />

            <TextField
              label="Email"
              fullWidth
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 2, borderRadius: 2, py: 1.3 }}
              type="submit"
            >
              Register
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default RegisterOrg;

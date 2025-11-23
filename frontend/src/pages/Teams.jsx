import { useState, useEffect } from "react";
import api from "../services/api";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  Box,
  Grid
} from "@mui/material";

import TeamForm from "../components/TeamForm";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadTeams = async () => {
    const res = await api.get("/teams");
    setTeams(res.data);
  };

  const loadEmployees = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    loadTeams();
    loadEmployees();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight={600} sx={{ mb: 3 }}>
        Teams
      </Typography>

      <Card sx={{ mb: 4, borderRadius: 3 }} elevation={3}>
        <CardContent>
          <Typography variant="h6">Create Team</Typography>

          <TeamForm
            buttonLabel="Create Team"
            onSubmit={async (data) => {
              await api.post("/teams", data);
              loadTeams();
            }}
          />
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {teams.map((team) => (
          <Grid item xs={12} md={6} lg={4} key={team.id}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                {editing === team.id ? (
                  <TeamForm
                    initialData={team}
                    buttonLabel="Update"
                    onSubmit={async (data) => {
                      await api.put(`/teams/${team.id}`, data);
                      setEditing(null);
                      loadTeams();
                    }}
                  />
                ) : (
                  <>
                    <Typography variant="h6">{team.name}</Typography>
                    <Typography sx={{ mb: 2 }}>{team.description}</Typography>

                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Assign Employee
                    </Typography>

                    <Select
                      fullWidth
                      onChange={async (e) => {
                        await api.post(`/teams/${team.id}/assign`, {
                          employeeId: e.target.value,
                        });
                        alert("Employee assigned!");
                      }}
                    >
                      <MenuItem>Select Employee</MenuItem>
                      {employees.map((emp) => (
                        <MenuItem value={emp.id} key={emp.id}>
                          {emp.first_name} {emp.last_name}
                        </MenuItem>
                      ))}
                    </Select>

                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="outlined"
                        sx={{ mr: 2 }}
                        onClick={() => setEditing(team.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={async () => {
                          await api.delete(`/teams/${team.id}`);
                          loadTeams();
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Teams;

import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import EmployeeForm from "../components/EmployeeForm";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadEmployees = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight={600} sx={{ mb: 3 }}>
        Employees
      </Typography>

      <Card sx={{ mb: 4, borderRadius: 3 }} elevation={3}>
        <CardContent>
          <Typography variant="h6">Add Employee</Typography>

          <EmployeeForm
            buttonLabel="Create Employee"
            onSubmit={async (data) => {
              await api.post("/employees", data);
              loadEmployees();
            }}
          />
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {employees.map((emp) => (
          <Grid item xs={12} md={6} lg={4} key={emp.id}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                {editing === emp.id ? (
                  <EmployeeForm
                    initialData={emp}
                    buttonLabel="Update"
                    onSubmit={async (data) => {
                      await api.put(`/employees/${emp.id}`, data);
                      setEditing(null);
                      loadEmployees();
                    }}
                  />
                ) : (
                  <>
                    <Typography variant="h6">
                      {emp.first_name} {emp.last_name}
                    </Typography>
                    <Typography>Email: {emp.email}</Typography>
                    <Typography>Phone: {emp.phone}</Typography>

                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="outlined"
                        sx={{ mr: 2 }}
                        onClick={() => setEditing(emp.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={async () => {
                          await api.delete(`/employees/${emp.id}`);
                          loadEmployees();
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

export default Employees;

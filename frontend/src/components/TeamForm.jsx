import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

function TeamForm({ initialData, onSubmit, buttonLabel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
    }
  }, [initialData]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, description });
      }}
    >
      <TextField
        label="Team Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {buttonLabel}
      </Button>
    </form>
  );
}

export default TeamForm;

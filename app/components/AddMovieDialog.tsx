"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Rating,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";

interface AddMovieDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  value: number | null;
  setValue: Dispatch<SetStateAction<number | null>>;
  genero: string;
  handleGenero: (event: SelectChangeEvent) => void;
  generos: { id: number; name: string }[];
  fetchData: () => void;
  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
}

export default function AddMovieDialog({
  open,
  setOpen,
  generos,
  fetchData,
  setSuccessMessage,
  setErrorMessage,
}: AddMovieDialogProps) {
  const [newMovie, setNewMovie] = useState({
    name: "",
    rating: 0,
    genre: 1,
    review: "",
  });

  const handleSubmit = async () => {
    if (newMovie.name.length < 1) {
      setErrorMessage("Falta uno o más campos de llenar de información.");
      return;
    }

    try {
      await axios.post("/api/movies", newMovie);
    } catch (error) {
      setErrorMessage("Error: " + error);
      setOpen(false);
      return;
    }
    setSuccessMessage("Película agregada de forma exitosa.")
    setOpen(false);
    await fetchData();
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Agregar Nueva Película</DialogTitle>
      <DialogContent>
        <Rating
          name="simple-controlled"
          value={newMovie.rating}
          onChange={(event, newValue) => {
            setNewMovie({ ...newMovie, rating: newValue ?? 0 });
          }}
        />

        <TextField
          margin="dense"
          label="Título"
          type="text"
          fullWidth
          variant="outlined"
          required
          value={newMovie.name}
          onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
        />

        <Select
          value={newMovie.genre || ""}
          onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
          fullWidth
          required
        >
          {generos.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>

        <TextField
          margin="dense"
          multiline
          rows={4}
          value={newMovie.review}
          fullWidth
          required
          onChange={(e) => setNewMovie({ ...newMovie, review: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

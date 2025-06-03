"use client";

import React, { useState } from "react";
import {
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Rating,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";

// interfaz para prop pelicula
export interface Pelicula {
  id: number;
  name: string;
  rating: number;
  genre: any;
  review: string;
}

// interfaz para prop movie card
interface MovieCardProps {
  pelicula: Pelicula;
  fetchData: () => void;
  generos: { id: number; name: string }[];
  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
}

export function MovieCard({
  pelicula,
  fetchData,
  generos,
  setSuccessMessage,
  setErrorMessage,
}: MovieCardProps) {
  const [open, setOpen] = useState(false);
  const [edited, setEdited] = useState<Pelicula>(pelicula);

  // encuentra el id del género en base a su nombre
  const findIdByName = (name: string): number | undefined => {
    const genero = generos.find((g) => g.name === name);
    return genero?.id;
  };

  const handleOpen = () => {
    setEdited(pelicula);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // maneja PUT para actualizar una peli
  const handleSave = async () => {
    try {
      let editedToSend = { ...edited };

      if (typeof edited.genre === "string") {
        editedToSend.genre = findIdByName(edited.genre);
      }

      console.log(editedToSend);
      await axios.put("/api/movies/" + pelicula.id, editedToSend);
      setSuccessMessage("Película actualizada con éxito.");
      await fetchData();
      setOpen(false);
    } catch (error) {
      setErrorMessage("Error actualizando película: " + error);
    }
  };

  // maneja DELETE para eliminar una peli
  const handleDelete = async () => {
    try {
      await axios.delete("/api/movies/" + pelicula.id);
      setSuccessMessage("Película eliminada con éxito.");
      await fetchData();
    } catch (error) {
      console.error("Error borrando película:", error);
    }
  };

  return (
    <>
      <Paper elevation={8} className="p-8">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="start"
          sx={{ width: "100%" }}
        >
          <div className="flex flex-col gap-5">
            <div>
              <Typography variant="h6">{pelicula.name}</Typography>
              <p>{pelicula.genre}</p>
            </div>
            <Rating value={pelicula.rating} readOnly />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {pelicula.review || "Sin reseña"}
            </Typography>
          </div>
          <IconButton onClick={handleOpen}>
            <PencilIcon className="w-5 h-5 text-gray-500" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <TrashIcon className="w-5 h-5 text-gray-500" />
          </IconButton>
        </Box>
      </Paper>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Editar Película</DialogTitle>
        <DialogContent>
          <TextField
            label="Título"
            fullWidth
            margin="dense"
            value={edited.name}
            onChange={(e) => setEdited({ ...edited, name: e.target.value })}
          />

          <Select
            // hacemos esto porque el genre puede ser texto y se ocupa buscar
            value={
              typeof edited.genre === "number"
                ? edited.genre
                : findIdByName(edited.genre) ?? ""
            }
            onChange={(e) =>
              setEdited({ ...edited, genre: Number(e.target.value) })
            }
            fullWidth
            required
          >
            {generos.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>

          <Rating
            value={edited.rating}
            onChange={(_, newRating) =>
              setEdited({ ...edited, rating: newRating ?? 0 })
            }
            sx={{ my: 2 }}
          />
          <TextField
            label="Reseña"
            fullWidth
            multiline
            rows={4}
            margin="dense"
            value={edited.review}
            onChange={(e) => setEdited({ ...edited, review: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

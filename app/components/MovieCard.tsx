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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";

export interface Pelicula {
  id: number;
  title: string;
  rating: number;
  genre: string;
  review: string;
}

interface MovieCardProps {
  pelicula: Pelicula;
  onUpdate?: (updated: Pelicula) => void; // ocupo un PUT /:movieid y mando toda la row
}

export function MovieCard({ pelicula, onUpdate }: MovieCardProps) {
  const [open, setOpen] = useState(false);
  const [edited, setEdited] = useState<Pelicula>(pelicula);

  const handleOpen = () => {
    setEdited(pelicula);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    onUpdate?.(edited);
    setOpen(false);
  };

  return (
    <>
      <Paper elevation={5} className="p-8">
        <Box display="flex" justifyContent="space-between" alignItems="start" sx = {{width: "100%"}}>
          <div className="flex flex-col gap-5">
            <div>
              <Typography variant="h6">{pelicula.title}</Typography>
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
          <IconButton onClick={() => console.log("deleted movie")}>
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
            value={edited.title}
            onChange={(e) => setEdited({ ...edited, title: e.target.value })}
          />
          <TextField
            label="Género"
            fullWidth
            margin="dense"
            value={edited.genre}
            onChange={(e) => setEdited({ ...edited, genre: e.target.value })}
          />
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

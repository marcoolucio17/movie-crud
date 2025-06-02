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
import { Dispatch, SetStateAction } from "react";

interface AddMovieDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  value: number | null;
  setValue: Dispatch<SetStateAction<number | null>>;
  genero: string;
  handleGenero: (event: SelectChangeEvent) => void;
  generos: { id: number; name: string }[];
}

export default function AddMovieDialog({
  open,
  setOpen,
  value,
  setValue,
  genero,
  handleGenero,
  generos,
}: AddMovieDialogProps) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Agregar Nueva Película</DialogTitle>
      <DialogContent>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />

        <TextField
          margin="dense"
          label="Título"
          type="text"
          fullWidth
          variant="outlined"
          required
        />

        <Select
          value={genero}
          label="Género"
          onChange={handleGenero}
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
          defaultValue="nunca había visto tanta caca junta .."
          fullWidth
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancelar</Button>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

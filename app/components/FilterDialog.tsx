"use client";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface FilterDialogProps {
  openFilterDialog: boolean;
  setOpenFilterDialog: (open: boolean) => void;
  genero: string;
  handleGenero: (event: SelectChangeEvent) => void;
  generos: { id: number; name: string }[];
}

export default function FilterDialog({
  openFilterDialog,
  setOpenFilterDialog,
  genero,
  handleGenero,
  generos,
}: FilterDialogProps) {
  return (
    <Dialog
      open={openFilterDialog}
      onClose={() => setOpenFilterDialog(false)}
      fullWidth
    >
      <DialogTitle>Editar Filtro</DialogTitle>
      <DialogContent>
        <Select value={genero} label="" onChange={handleGenero} fullWidth>
          {generos.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
          <MenuItem key={"all"} value={"all"}>
            Todo
          </MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenFilterDialog(false)}>Cancelar</Button>
        <Button variant="contained" onClick={() => setOpenFilterDialog(false)}>
          Aplicar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FilterDialog from "./components/FilterDialog";
import AddMovieDialog from "./components/AddMovieDialog";
import { MovieCard } from "./components/MovieCard";

export default function Home() {
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openAddMovieDialog, setOpenAddMovieDialog] = useState(false);
  const [value, setValue] = useState<number | null>(2);

  const [genero, setGenero] = useState("1");

  const handleGenero = (event: SelectChangeEvent) => {
    setGenero(event.target.value as string);
  };

  const generos = [
    { id: 1, name: "Acción" },
    { id: 2, name: "Romance" },
    { id: 3, name: "Drama" },
    { id: 4, name: "Suspenso" },
  ];

  const peliculas = [
  {
    id: 1,
    title: "El Padrino",
    rating: 5,
    genre: "Crimen",
    review: "Una obra maestra del cine, actuaciones inolvidables y dirección impecable.",
  },
  {
    id: 2,
    title: "Interestelar",
    rating: 4,
    genre: "Ciencia ficción",
    review: "Visualmente impresionante, con una historia que desafía la lógica del tiempo.",
  },
  {
    id: 3,
    title: "El Laberinto del Fauno",
    rating: 5,
    genre: "Fantasía",
    review: "Una mezcla perfecta de fantasía y realidad con una atmósfera oscura e intensa.",
  },
  {
    id: 4,
    title: "Titanic",
    rating: 4,
    genre: "Romance",
    review: "Un drama romántico épico con una producción espectacular.",
  },
  {
    id: 5,
    title: "Shrek 2",
    rating: 5,
    genre: "Animación",
    review: "Divertida, encantadora y llena de referencias geniales para todas las edades.",
  },
];


  return (
    <div className="p-24 flex w-full">
      <div className="w-full flex flex-col h-full gap-6">
        <p className="text-2xl font-sans font-light">Bienvenido a CineTec</p>

        <div className="w-full flex flex-row gap-3 justify-between">
          <SearchBar />

          <div className="flex flex-row gap-6">
            <Fab variant="extended" onClick={() => setOpenFilterDialog(true)}>
              <FilterAltIcon sx={{ mr: 1 }} />
              Filter by
            </Fab>

            <Fab
              color="primary"
              aria-label="add"
              onClick={() => setOpenAddMovieDialog(true)}
            >
              <AddIcon />
            </Fab>
          </div>
        </div>

        <FilterDialog
          openFilterDialog={openFilterDialog}
          setOpenFilterDialog={setOpenFilterDialog}
          genero={genero}
          handleGenero={handleGenero}
          generos={generos}
        />

        <AddMovieDialog
          open={openAddMovieDialog}
          setOpen={setOpenAddMovieDialog}
          value={value}
          setValue={setValue}
          genero={genero}
          handleGenero={handleGenero}
          generos={generos}
        />

        {/* ahora mostramos las pelis */}
        <div id="peli-container" className="grid grid-cols-3 gap-5">
          {peliculas.map((pelicula) => (
            <MovieCard
              key={pelicula.id}
              pelicula={pelicula}
              // onUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

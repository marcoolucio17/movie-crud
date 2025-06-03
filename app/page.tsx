"use client";

import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FilterDialog from "./components/FilterDialog";
import AddMovieDialog from "./components/AddMovieDialog";
import { MovieCard, Pelicula } from "./components/MovieCard";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openAddMovieDialog, setOpenAddMovieDialog] = useState(false);
  const [value, setValue] = useState<number | null>(2);
  const [genero, setGenero] = useState("all");

  const [peliculas, setPeliculas] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGenero = (event: SelectChangeEvent) => {
    setGenero(event.target.value as string);
    console.log(genero);
  };

  const fetchData = async () => {
    setLoading(true);
    await fetchPeliculas();
    await fetchGenres();
  };

  const findIdByName = (name: string): number | undefined => {
    const genero: any = generos.find((g: any) => g.name === name);
    return genero?.id;
  };

  const fetchPeliculas = async () => {
    try {
      const response = await axios.get("/api/movies");
      setPeliculas(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get("/api/genres");
      setGeneros(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // una vez al montar
  useEffect(() => {
    fetchData();
  }, []);

  const [search, setSearch] = useState("");

  // aquí filtramo las películas en base a nombre y género
  const filteredPeliculas = peliculas.filter((peli: Pelicula) => {
    const matchesSearch = peli.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const peliGenreId =
      typeof peli.genre === "number" ? peli.genre : findIdByName(peli.genre);

    const matchesGenre = genero === "all" || String(peliGenreId) == genero; // deje 2 == por simplicidad

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="p-24 flex w-full">
      <div className="w-full flex flex-col h-full gap-6">
        <p className="text-2xl font-sans font-light">Bienvenido a CineTec</p>

        <div className="w-full flex flex-row gap-3 justify-between">
          <SearchBar search={search} setSearch={setSearch} />

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
          fetchData={fetchData}
        />

        {/* ahora mostramos las pelis */}
        <>
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <CircularProgress />
            </div>
          ) : (
            <div id="peli-container" className="grid grid-cols-3 gap-5">
              {filteredPeliculas.map((pelicula, idx) => (
                <MovieCard
                  key={idx}
                  pelicula={pelicula}
                  fetchData={fetchData}
                  generos={generos}
                />
              ))}
            </div>
          )}
        </>
      </div>
    </div>
  );
}

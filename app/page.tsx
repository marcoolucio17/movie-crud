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
import { CircularProgress, Alert, Snackbar } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";

// Componente principal de la aplicación
export default function Home() {
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openAddMovieDialog, setOpenAddMovieDialog] = useState(false);
  const [value, setValue] = useState<number | null>(2);
  const [genero, setGenero] = useState("all");

  const [peliculas, setPeliculas] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // ✅ new

  const handleGenero = (event: SelectChangeEvent) => {
    setGenero(event.target.value as string);
  };

  // Agrupación de métodos de fetch
  const fetchData = async () => {
    setLoading(true);
    await fetchPeliculas();
    await fetchGenres();
    // setSuccessMessage("Fetch realizado con éxito!!")
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
      setError("No se pudieron cargar las películas.");
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get("/api/genres");
      setGeneros(response.data);
    } catch (error) {
      setError("No se pudieron cargar los géneros.");
    } finally {
      setLoading(false);
    }
  };

  // Al montarse el componente, se hace el fetch inicial
  useEffect(() => {
    fetchData();
  }, []);

  const [search, setSearch] = useState("");

  // Variable para sostener las películas bajo los filtros específicados por el usuario
  const filteredPeliculas = peliculas.filter((peli: Pelicula) => {
    const matchesSearch = peli.name
      .toLowerCase()
      .includes(search.toLowerCase());

    // debido a que el objetivo peli puede tener o el ID del género o el nombre del género, hacemos esta revisión
    const peliGenreId =
      typeof peli.genre === "number" ? peli.genre : findIdByName(peli.genre);

    const matchesGenre = genero === "all" || String(peliGenreId) == genero;

    // mostramos lo que cumpla con la búsqueda y el género especificado
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
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setError}
        />

        <>
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <CircularProgress />
            </div>
          ) : filteredPeliculas.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-500">
              <InboxIcon sx={{ fontSize: 64, marginBottom: 2 }} />
              <p className="text-lg font-medium">No se encontraron películas</p>
            </div>
          ) : (
            <div id="peli-container" className="grid grid-cols-3 gap-5 overflow-y-scroll h-160 p-3">
              {filteredPeliculas.map((pelicula, idx) => (
                <MovieCard
                  key={idx}
                  pelicula={pelicula}
                  fetchData={fetchData}
                  generos={generos}
                  setSuccessMessage={setSuccessMessage}
                  setErrorMessage={setError}
                />
              ))}
            </div>
          )}
        </>
      </div>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={5000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={() => setSuccessMessage(null)}
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

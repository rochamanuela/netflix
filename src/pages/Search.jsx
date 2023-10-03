import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

import "./MoviesGrid.css";

const Search = () => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const query = searchParams.get("q");
    const apiKey = "d1b37f86dc7cc5d9dbbd86a5d46e1de1";
    const searchURL = "https://api.themoviedb.org/3/search/movie";

    useEffect(() => {
        const getSearchedMovies = async () => {
            try {
                if (!query) {
                    return;
                }

                const params = new URLSearchParams({
                    api_key: apiKey,
                    query: query,
                });

                const searchWithQueryURL = `${searchURL}?${params.toString()}`;
                const res = await fetch(searchWithQueryURL);
                const data = await res.json();

                setMovies(data.results);
            } catch (error) {
                console.error("Erro ao buscar filmes:", error);
            }
        };

        getSearchedMovies();
    }, [query, apiKey]);

    return (
        <div className="container">
            <h2 className="title">
                Resultados para: <span className="query-text">{query}</span>
            </h2>
            <div className="movies-container">
                {movies.length === 0 && <p>Carregando...</p>}
                {movies.length > 0 &&
                    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    );
};

export default Search;

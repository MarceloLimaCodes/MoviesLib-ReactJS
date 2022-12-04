import { useState, useEffect } from "react"

import { MovieCard } from "../../components/MovieCard"

import '../styles/global-pages.css'

const moviesUrl = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

export function Home() {
    const [topMovies, setTopMovies] = useState([])

    useEffect(() => {
        const topRatedUrl = `${moviesUrl}top_rated?${apiKey}`

        async function getTopRetedMovies(url) {
            const response = await fetch(url)
            const data = await response.json()
    
            setTopMovies(data.results)
        }

        getTopRetedMovies(topRatedUrl)
    }, [])

    return (
        <div className="container">
            <h2 className="title">Melhores Filmes:</h2>
            <div className="movies-container">
                {topMovies.length === 0 && <p>Carregando...</p>}
                {topMovies.length > 0 && topMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

// Uma das maiores referências que temos que ter para componentizar algo é imaginar se iremos reutilizar aquilo dentro de alguma outra página ou até na mesma página. Caso contrário, não há necessidade de componentizar esse elemento
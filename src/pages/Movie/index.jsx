import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFileEarmarkTextFill
} from 'react-icons/bs'

import { MovieCard } from "../../components/MovieCard"

import './styles.css'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

export function Movie() {
    const { id } = useParams()
    const [movie, setMovie] = useState()

    function formatCurrency(number) {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    }

    useEffect(() => {
        const  movieURL = `${moviesURL}${id}?${apiKey}` 

        async function getMovie(url) {
            const response = await fetch(url)
            const data = await response.json()

            setMovie(data)
        }

        getMovie(movieURL)

    }, [])

    return (
        <div className="movie-page">
            {movie && (
                <>
                    <MovieCard movie={movie} showLink={false} />
                    <p className="tagline">{movie.tagline}</p>
                    <div className="info-container" >
                        <div className="info">
                            <h3>
                                <BsWallet2 /> Orçamento:
                            </h3>
                            <p>{formatCurrency(movie.budget)}</p>
                        </div>
                        <div className="info">
                            <h3>
                                <BsGraphUp /> Receita:
                            </h3>
                            <p>{formatCurrency(movie.revenue)}</p>
                        </div>
                        <div className="info">
                            <h3>
                                <BsHourglassSplit /> Duração:
                            </h3>
                            <p>{movie.runtime} minutos</p>
                        </div>
                        <div className="info-description">
                            <h3>
                                <BsFileEarmarkTextFill /> Descrição:
                            </h3>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
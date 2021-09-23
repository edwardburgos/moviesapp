import { DetailProps, MovieDetail } from '../../extras/types';
import defaultPoster from '../../img/defaultPoster.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Detail({ id }: DetailProps) {

    const [movie, setMovie] = useState<MovieDetail>({
        adult: false, belongs_to_collection: { id: 0, name: "" },
        budget: 0, genres: [{ id: 0, name: "" }], id: 0, original_language: "", original_title: "", overview: "",
        poster_path: "", production_companies: [{ id: 0, name: "" }], release_date: "", revenue: 0,
        status: "", title: "", vote_average: 0, vote_count: 0
    })

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        async function getMovieInfo() {
            try {
                const movie = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`, { cancelToken: source.token })
                setMovie(movie.data)
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message === "Unmounted") return "Unmounted";
                }
            }
        }
        getMovieInfo();
        return () => { source.cancel("Unmounted"); }
    }, [id])

    return (
        <div>
            <h1>{movie.title}</h1>
            {movie.title !== movie.original_title ?
                <>
                    <span>Original Title</span>
                    <p>{movie.original_title}</p>
                    <span>Original Language</span>
                    <p>{movie.original_language}</p>
                </> : null}
            {movie.overview ?
                <>
                    <span>Overview</span>
                    <p>{movie.overview}</p>
                </> : null}
            {movie.status !== 'Canceled' ?
                <>
                    <span>Release date</span>
                    <p>{movie.release_date}</p>
                </> : null}
            <span>Suitable for</span>
            <p>{movie.adult ? 'Adults only' : 'Whole family'}</p>
            {movie.status !== 'Released' ?
                <>
                    <span>Current state</span>
                    <p>{movie.status === 'Post Production' ? 'In ' : ''}{movie.status}</p>
                </> : null}
            {movie.belongs_to_collection ?
                <>
                    <span>Collection</span>
                    <Link to={`/collection/${movie.belongs_to_collection.id}`}>{movie.belongs_to_collection.name}</Link>
                </> : null}
            {movie.budget ?
                <>
                    <span>Budget</span>
                    <p>$ {movie.budget.toLocaleString()}</p>
                </> : null}
            {movie.revenue ?
                <>
                    <span>Revenue</span>
                    <p>$ {movie.revenue.toLocaleString()}</p>
                </> : null}
            <span>Genres</span>
            {movie.genres.length === 1 ?
                <Link to={`/genre/${movie.genres[0].name.toLowerCase()}`}>{movie.genres[0].name}</Link>
                :
                <ul>{movie.genres.map(e => <li><Link to={`/genre/${e.name.toLowerCase()}`}>{e.name}</Link></li>)}</ul>
            }
            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultPoster} alt={movie.title}></img>
            <span>Production companies</span>
            {movie.production_companies.length === 1 ?
                <Link to={`/genre/${movie.production_companies[0].name.toLowerCase()}`}>{movie.production_companies[0].name}</Link>
                :
                <ul>{movie.production_companies.map(e => <li><Link to={`/genre/${e.name.toLowerCase()}`}>{e.name}</Link></li>)}</ul>}
            {movie.vote_average && movie.vote_count ?
                <>
                    <span>Vote Count</span>
                    <p>{movie.vote_count}</p>
                    <span>Vote Average</span>
                    <p>{movie.vote_average} / 10</p>
                </>
                : null
            }
        </div>
    );
}

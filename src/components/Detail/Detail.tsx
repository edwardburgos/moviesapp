import { DetailProps, MovieDetail } from '../../extras/types';
import defaultPoster from '../../img/defaultPoster.jpg';
import s from './Detail.module.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap'
import { useEffect } from 'react';
import { useState } from 'react';
import { isoLangs } from '../../extras/globalVariables';

export default function Detail({ id }: DetailProps) {

    const [movie, setMovie] = useState<MovieDetail>({
        adult: false, belongs_to_collection: { id: 0, name: "" },
        budget: 0, genres: [{ id: 0, name: "" }], id: 0, original_language: "en", original_title: "", overview: "",
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
        <div className={s.container}>
            <div className={s.posterContainer}>
                <img className={s.poster} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultPoster} alt={movie.title}></img>
            </div>
            <div className={s.info}>
                <h1 className={s.title}>{movie.title}</h1>
                {movie.title !== movie.original_title ?
                    <>
                        <span className='bold'>Original Title</span>
                        <p>{movie.original_title}</p>
                        <span className='bold'>Original Language</span>
                        <p>{isoLangs[movie.original_language].name}</p>
                    </> : null}
                {movie.overview ?
                    <>
                        <span className='bold'>Overview</span>
                        <p>{movie.overview}</p>
                    </> : null}
                {movie.status !== 'Canceled' ?
                    <>
                        <span className='bold'>Release date</span>
                        <p>{movie.release_date}</p>
                    </> : null}
                <span className='bold'>Suitable for</span>
                <p>{movie.adult ? 'Adults only' : 'Whole family'}</p>
                {movie.status !== 'Released' ?
                    <>
                        <span className='bold'>Current state</span>
                        <p>{movie.status === 'Post Production' ? 'In ' : ''}{movie.status}</p>
                    </> : null}
                {movie.belongs_to_collection ?
                    <>
                        <span className='bold'>Collection</span>
                        <p><Link className='customLink' to={`/collection/${movie.belongs_to_collection.id}/${movie.belongs_to_collection.name.toLowerCase().replaceAll(' ', '-')}`}>{movie.belongs_to_collection.name}</Link></p>
                    </> : null}
                {movie.budget ?
                    <>
                        <span className='bold'>Budget</span>
                        <p>$ {movie.budget.toLocaleString()}</p>
                    </> : null}
                {movie.revenue ?
                    <>
                        <span className='bold'>Revenue</span>
                        <p>$ {movie.revenue.toLocaleString()}</p>
                    </> : null}
                <span className='bold'>Genres</span>
                {movie.genres.length === 1 ?
                    <p><Link className='customLink' to={`/genre/${movie.genres[0].id}/${movie.genres[0].name.toLowerCase().replaceAll(' ', '-')}`}>{movie.genres[0].name}</Link></p>
                    :
                    <ul>{movie.genres.map(e => <li><Link className='customLink' to={`/genre/${e.id}/${e.name.toLowerCase().replaceAll(' ', '-')}`}>{e.name}</Link></li>)}</ul>
                }
                {
                    movie.production_companies.length !== 0 ?
                        movie.production_companies.length === 1 ?
                            <>
                                <span className='bold'>Production company</span>
                                <p><Link className='customLink' to={`/companie/${movie.production_companies[0].id}/${movie.production_companies[0].name.toLowerCase().replaceAll(' ', '-')}`}>{movie.production_companies[0].name}</Link></p>
                            </>
                            :
                            <>
                                <span className='bold'>Production companies</span>
                                <ul>{movie.production_companies.map(e => <li><Link className='customLink' to={`/companie/${e.id}/${e.name.toLowerCase().replaceAll(' ', '-')}`}>{e.name}</Link></li>)}</ul>
                            </>
                        :
                        null
                }
                {movie.vote_average && movie.vote_count ?
                    <>
                        <div className={s.voteInfo}>
                            <span className={s.label}>Vote Average</span>
                            <span className={s.description}>{movie.vote_average} of 10</span>
                        </div>
                        <div className={s.voteInfo}>
                            <span className={s.label}>Vote Count</span>
                            <span className={s.description}>{movie.vote_count} votes</span>
                        </div>
                        <div className='mb-3'>
                            <ProgressBar now={(movie.vote_average) * 10} />
                        </div>
                    </>
                    : null
                }
            </div>
        </div>
    );
}

import { SearchProps } from "../../extras/types"
import { useState, useEffect } from "react"
import { Movie, GenreType} from "../../extras/types"
import axios from "axios"
import s from './Genre.module.css'
import Card from "../Card/Card"
import loadingGif from '../../img/loadingGif.gif';

export default function Genre({ id }: SearchProps) {
    const [genreName, setGenreName] = useState('')
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        async function getCollection() {
            try {
                setLoading(true)
                const genres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                setGenreName(genres.data.genres.filter((e:GenreType)=> e.id === id)[0].name)
                const movies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&with_genres=${id}`);
                setMovies(movies.data.results)
                setLoading(false)
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message === "Unmounted") return "Unmounted";
                }
            }
        }
        getCollection();
        return () => { source.cancel("Unmounted"); }
    }, [id])

    return (
        <>
            {!loading ?
                <div className={s.container}>
                    <h1 className='w-100 text-center'>{genreName} Movies</h1>
                    <div className={s.cardsContainer}>
                        {movies.map((e, index) => <Card key={index} movie={e}></Card>)}
                    </div> 
                </div>

                :
                <div className={s.contentCenter}>
                    <img className={s.loading} src={loadingGif} alt='loadingGif'></img>
                </div>
            }
        </>
    )
}
import { SearchProps } from "../../extras/types"
import { useState, useEffect } from "react"
import { Movie, GenreType } from "../../extras/types"
import axios from "axios"
import s from './Genre.module.css'
import Card from "../Card/Card"
import loadingGif from '../../img/loadingGif.gif';
import { showMessage } from "../../extras/functions";
import { Form } from 'react-bootstrap';

export default function Genre({ id }: SearchProps) {
    const [genreName, setGenreName] = useState('')
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [sorting, setSorting] = useState('popularity.desc')


    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        async function getCollection() {
            try {
                setLoading(true)
                const genres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                setGenreName(genres.data.genres.filter((e: GenreType) => e.id === id)[0].name)
                const movies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&with_genres=${id}`);
                setMovies(movies.data.results)
                setLoading(false)
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message === "Unmounted") return "Unmounted";
                }
                showMessage('Sorry, an error ocurred')
            }
        }
        getCollection();
        return () => { source.cancel("Unmounted"); }
    }, [id])

    async function sortBy(sortParameter: string) {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=${sortParameter}&page=1&with_genres=${id}`
        const results = await axios.get(url)
        setMovies(results.data.results)
    }

    return (
        <>
            {!loading ?
                <div className='flexCentered'>
                    <h1 className='w-100 text-center'>{genreName} Movies</h1>
                    <Form.Select className={s.selectInput} aria-label="Default select example" value={sorting} onChange={(e) => { const target = e.target as HTMLSelectElement; sortBy(target.value); setSorting(target.value) }}>
                        <option value='popularity.asc'>Sort by current popularity ascending</option>
                        <option value='popularity.desc'>Sort by current popularity descending</option>
                        <option value='primary_release_date.asc'>Sort by release date ascending</option>
                        <option value='primary_release_date.desc'>Sort by release date descending</option>
                        <option value='revenue.asc'>Sort by revenue ascending</option>
                        <option value='revenue.desc'>Sort by revenue descending</option>
                        <option value='vote_average.asc'>Sort by best rated ascending</option>
                        <option value='vote_average.desc'>Sort by best rated descending</option>
                        <option value='vote_count.asc'>Sort by most rated ascending</option>
                        <option value='vote_count.desc'>Sort by most rated descending</option>
                    </Form.Select>
                    <div className='cardsContainer'>
                        {movies.map((e, index) => <Card key={index} movie={e}></Card>)}
                    </div>
                </div>
                :
                <div className='contentCenter'>
                    <img className='loading' src={loadingGif} alt='loadingGif'></img>
                </div>
            }
        </>
    )
}
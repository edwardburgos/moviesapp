import { useState } from 'react';
import s from './Search.module.css';
import { Form } from 'react-bootstrap';
import closeCircle from '../../img/icons/close-circle-outline.svg';
import search from '../../img/icons/search-outline.svg';
import axios from 'axios';
import { showMessage } from '../../extras/functions';
import Card from '../Card/Card'
import { Movie } from '../../extras/types';
import loadingGif from '../../img/loadingGif.gif';
import noResults from '../../img/noResults.svg';

export default function SearchBar() {

    const [movies, setMovies] = useState<Movie[] | null>(null)
    const [title, setTitle] = useState<string>('');
    const [loading, setLoading] = useState(false);

    async function searchMovie(title: string) {
        try {
            setLoading(true)
            const movies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${title}&page=1`)
            setMovies(movies.data.results)
            setLoading(false)
        } catch (e) {
            showMessage('Sorry, an error ocurred')
        }
    }

    return (
        <div className='flexCentered'>
            <div className={`${s.test} ${s.searchInput}`}>
                <Form.Control value={title} className={s.input} placeholder="Search a movie" onChange={e => { setTitle(e.target.value); e.target.value ? searchMovie(e.target.value) : setMovies(null) }} />
                <img src={title ? closeCircle : search} className={s.iconDumb} onClick={() => {setTitle(''); setMovies(null);}} alt={title ? 'Remove movie title' : 'Search a movie'} />
            </div>
            {movies ?
                !loading ?
                    <div className={s.cardsContainerFull}>
                        {movies.length ?
                            movies.map((e, index) => <Card key={index} movie={e}></Card>)
                            :
                            <div className='text-center'>
                                <img className={s.noResults} src={noResults} alt='noResults'></img>
                                <p className='bold mb-0 text-center'>No results found</p>
                            </div>
                        }
                    </div>
                    :
                    <div className='contentCenter134'>
                        <img className='loading' src={loadingGif} alt='loadingGif'></img>
                    </div>
                :
                null
            }
        </div>
    )
}


//noResults
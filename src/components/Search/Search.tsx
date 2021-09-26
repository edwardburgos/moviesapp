import { useState } from 'react';
import s from './Search.module.css';
import { Form } from 'react-bootstrap';
import closeCircle from '../../img/icons/close-circle-outline.svg';
import search from '../../img/icons/search-outline.svg';
import axios from 'axios';
import { showMessage } from '../../extras/functions';
import Card from '../Card/Card'
import { Movie } from '../../extras/types';

export default function SearchBar() {

    const [movies, setMovies] = useState<Movie[]>([])
    const [title, setTitle] = useState<string>('');

    async function searchMovie(title: string) {
        try {
            const movies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${title}&page=1`)
            setMovies(movies.data.results)
        } catch (e) {
            showMessage('Sorry, an error ocurred')
        }
    }

    return (
        <div className='flexCentered'>
            <div className={`${s.test} ${s.searchInput}`}>
                <Form.Control value={title} className={s.input} placeholder="Search a movie" onChange={e => { setTitle(e.target.value); if (e.target.value) { searchMovie(e.target.value) } }} />
                <img src={title ? closeCircle : search} className={s.iconDumb} onClick={() => setTitle('')} alt={title ? 'Remove movie title' : 'Search a movie'} />
            </div>
            {
                movies.length ?

                    <div className='cardsContainer'>
                        {movies.map((e, index) => <Card key={index} movie={e}></Card>)}
                    </div>
                    :
                    null
            }
        </div>
    )
}

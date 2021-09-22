import { useState } from 'react';
import s from './SearchBar.module.css';
import { Form } from 'react-bootstrap';
import closeCircle from '../../img/icons/close-circle-outline.svg';
import search from '../../img/icons/search-outline.svg';
import axios from 'axios';
import { SearchResult } from '../../extras/types';
import { useDispatch} from 'react-redux';
import { modifyMovies } from '../../actions';

export default function SearchBar() {

    const dispatch = useDispatch()
    const [title, setTitle] = useState<string>('');

    async function searchMovie(title: string) {
        const movies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${title}&page=1`)
        dispatch(modifyMovies(movies.data.results.map((e: SearchResult) => {return {title: e.title}})))
    }

    return (
        <div className={`${s.test} ${s.searchInput}`}>
            <Form.Control value={title} className={s.input} placeholder="Search a movie" onChange={e => { setTitle(e.target.value); if (e.target.value) { searchMovie(e.target.value)}}} />
            <img src={title ? closeCircle : search} className={s.iconDumb} onClick={() => setTitle('')} alt={title ? 'Remove movie title' : 'Search a movie'} />
        </div>
    );
}

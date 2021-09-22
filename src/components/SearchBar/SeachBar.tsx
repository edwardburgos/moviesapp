import { useState } from 'react';
import s from './SearchBar.module.css';
import { Form } from 'react-bootstrap';
import closeCircle from '../../img/icons/close-circle-outline.svg';
import search from '../../img/icons/search-outline.svg'

export default function SearchBar() {

    const [name, setName] = useState<string>('')

    return (
        <div className={`${s.test} ${s.searchInput}`}>
            <Form.Control value={name} className={s.input} placeholder="Search a movie" onChange={e => { setName(e.target.value) }} />
            <img src={name ? closeCircle : search} className={s.iconDumb} onClick={() => setName('')} alt={name ? 'Remove movie title' : 'Search a movie'} />
        </div>
    );
}

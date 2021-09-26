import { CardProps } from '../../extras/types';
import s from './Card.module.css'
import defaultPoster from '../../img/defaultPoster.jpg';
import { Link } from 'react-router-dom';
import { months } from '../../extras/globalVariables';

export default function Card({ movie }: CardProps) {
    
    return (
        <div className={s.card}>
        <Link to={`/detail/${movie.id}/${movie.title.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}><img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultPoster} alt={movie.title} className={s.poster}></img></Link>
        <Link className='bold mb-0 customLink' to={`/detail/${movie.id}/${movie.title.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>{movie.title}</Link>
        { movie.release_date ? <p className='mb-0'>{`${movie.release_date.split('-')[2]} ${months[parseInt(movie.release_date.split('-')[1]) - 1]} ${movie.release_date.split('-')[0]}`}</p> : null}
        </div>
    );
}
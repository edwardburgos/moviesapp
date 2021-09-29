import { CardProps } from '../../extras/types';
import s from './CardPerson.module.css'
import defaultProfile from '../../img/icons/person-outline.svg';
import { Link } from 'react-router-dom';

export default function CardPerson({ movie }: CardProps) {
    return (
        <>
            {
                movie.id && movie.name && movie.known_for_department ?
                    <div className={s.card}>
                        <div className={s.cardContent}>
                            <Link to={`/person/${movie.id}/${movie.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}><img src={movie.profile_path ? `https://image.tmdb.org/t/p/w500${movie.profile_path}` : defaultProfile} alt={movie.name} className={movie.profile_path ? s.poster : s.posterDefault}></img></Link>
                            <Link className='bold block mb-0 customLink' to={`/person/${movie.id}/${movie.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>{movie.name}</Link>
                            <span className='block'>{movie.known_for_department}</span>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    );
}
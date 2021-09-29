import { CardProps } from '../../extras/types';
import s from './CardCompany.module.css'
import defaultLogo from '../../img/icons/videocam-outline.svg'
import { Link } from 'react-router-dom';
import { countries } from '../../extras/globalVariables'

export default function CardCompany({ movie }: CardProps) {
    return (
        <>
            {
                movie.id && movie.name ?
                    <div className={s.card}>
                        <div className={s.cardContent}>
                            <Link to={`/company/${movie.id}/${movie.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}><img src={movie.logo_path ? `https://image.tmdb.org/t/p/w500${movie.logo_path}` : defaultLogo} alt={movie.name} className={s.poster}></img></Link>
                            <Link className='bold block mb-0 customLink' to={`/company/${movie.id}/${movie.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>{movie.name}</Link>
                            {movie.origin_country ? <span className='block'>{countries.filter(e => e.code === movie.origin_country)[0].name}</span> : null}
                        </div>
                    </div>
                    :
                    null
            }
        </>
    );
}
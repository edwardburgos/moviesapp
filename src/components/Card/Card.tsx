import { CardProps } from '../../extras/types';
import s from './Card.module.css'
import defaultPoster from '../../img/defaultPoster.jpg'

export default function Card({ movie }: CardProps) {
    return (
        <div className={s.card}>
        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultPoster} alt={movie.title} className={s.poster}></img>
        <p className='bold mb-0'>{movie.title}</p>
        { movie.release_date ? <p className='mb-0'>{movie.release_date}</p> : null}
        
        </div>
    );
}

//{ movie.adult ? }  import alertCircle from '../../img/alert-circle-outline.svg';


// adult: boolean,
//     backdrop_path: string,
//     genre_ids: number[],
//     id: number,
//     original_language: string,
//     original_title: string,
//     overview: string,
//     popularity: number,
//     poster_path: string,
//     release_date: string,
//     title: string,
//     video: boolean,
//     vote_average: number,
//     vote_count: number
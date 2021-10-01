import { CardProps } from '../../extras/types';
import s from './Card.module.css'
import defaultPoster from '../../img/icons/alert-circle-outline.svg';
import { Link } from 'react-router-dom';
import { months } from '../../extras/globalVariables';
import heart from '../../img/icons/heart.svg'
import { useEffect, useState } from 'react';
import { modifyFavorites } from '../../actions';
import { useDispatch } from 'react-redux'

export default function Card({ movie }: CardProps) {

    const [selected, setSelected] = useState(false)

    const dispatch = useDispatch()
    function addToFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoriteMovies')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies)
            if (!array.filter((e: number) => e === movie.id).length) {
                array.push(movie.id)
                localStorage.setItem('favoriteMovies', JSON.stringify(array))
            }
        } else {
            localStorage.setItem('favoriteMovies', JSON.stringify([movie.id]))
        }
        setSelected(true)
    }

    function deleteFromFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoriteMovies')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies).filter((e: number) => e !== movie.id)
            localStorage.setItem('favoriteMovies', JSON.stringify(array))
        }
        setSelected(false)
        dispatch(modifyFavorites(true))
    }

    useEffect(() => {
        const favoriteMovies = localStorage.getItem('favoriteMovies')
        if (favoriteMovies) {
            if (JSON.parse(favoriteMovies).includes(movie.id)) setSelected(true)
        }
    }, [])

    return (
        <>
            {
                movie.id && movie.title ?
                    <div className={s.card}>
                        <div className={s.cardContent}>
                            <Link to={`/detail/${movie.id}/${movie.title.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}><img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultPoster} alt={movie.title} className={movie.poster_path ? s.poster : s.posterDefault}></img></Link>
                            <Link className='bold block mb-0 customLink' to={`/detail/${movie.id}/${movie.title.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>{movie.title}</Link>
                            {movie.release_date ? <p className='mb-0'>{`${movie.release_date.split('-')[2]} ${months[parseInt(movie.release_date.split('-')[1]) - 1]} ${movie.release_date.split('-')[0]}`}</p> : null}
                            <div className={selected ? s.noColor : s.heartIconContainer} onClick={() => selected ? deleteFromFavoriteMovies() : addToFavoriteMovies()}>
                                <img src={heart} className={selected ? s.redHeart : s.heartIcon} alt={'Add to favorite movies'} />
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    );
}
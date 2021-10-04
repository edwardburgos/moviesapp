import { CardProps } from '../../extras/types';
import s from './CardPerson.module.css'
import defaultProfile from '../../img/icons/person-outline.svg';
import { Link } from 'react-router-dom';
import heart from '../../img/icons/heart.svg'
import { modifyFavoritePeople } from '../../actions';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'

export default function CardPerson({ movie }: CardProps) {

    const [selected, setSelected] = useState(false)

    const dispatch = useDispatch()
    function addToFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoritePeople')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies)
            if (!array.filter((e: number) => e === movie.id).length) {
                array.push(movie.id)
                localStorage.setItem('favoritePeople', JSON.stringify(array))
            }
        } else {
            localStorage.setItem('favoritePeople', JSON.stringify([movie.id]))
        }
        setSelected(true)
    }

    function deleteFromFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoritePeople')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies).filter((e: number) => e !== movie.id)
            localStorage.setItem('favoritePeople', JSON.stringify(array))
        }
        setSelected(false)
        dispatch(modifyFavoritePeople(true))
    }

    useEffect(() => {
        const favoriteMovies = localStorage.getItem('favoritePeople')
        if (favoriteMovies) {
            if (JSON.parse(favoriteMovies).includes(movie.id)) setSelected(true)
        }
    }, [])

    return (
        <>
            {
                movie.id && movie.name ?
                    <div className={s.card}>
                        <div className={s.cardContent}>
                            <Link to={`/person/${movie.id}/${movie.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}><img src={movie.profile_path ? `https://image.tmdb.org/t/p/w500${movie.profile_path}` : defaultProfile} alt={movie.name} className={movie.profile_path ? s.poster : s.posterDefault}></img></Link>
                            <Link className='bold block mb-0 customLink' to={`/person/${movie.id}/${movie.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>{movie.name}</Link>
                            <span className='block'>{movie.known_for_department}</span>
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
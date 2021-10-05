import { CardPersonDetailProps } from '../../extras/types';
import s from './CardPersonDetail.module.css'
import defaultProfile from '../../img/icons/person-outline.svg';
import { Link } from 'react-router-dom';
import heart from '../../img/icons/heart.svg'
import { modifyFavoritePeople } from '../../actions';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'

export default function CardPersonDetail({ movie }: CardPersonDetailProps) {

    const [selected, setSelected] = useState(false)

    const dispatch = useDispatch()
    function addToFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoritePeople')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies)
            if (!array.filter((e: number) => e === movie.id).length) {
                array.unshift(movie.id)
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
                        <div className={`${s.fullCastMember} linkDiv`}>
                            <Link to={`/person/${movie.id}/${movie.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}><img className={movie.profile_path ? s.profilePic : s.defaultProfilePic} src={movie.profile_path ? `https://image.tmdb.org/t/p/w500${movie.profile_path}` : defaultProfile} alt={movie.name}></img></Link>
                            <Link className={`${s.name} linkDiv`} to={`/person/${movie.id}/${movie.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>
                                <span className='bold block'>{movie.name}</span>
                                <span>{movie.character}</span>
                            </Link>
                            <div className={selected ? s.noColor : s.heartIconContainer} onClick={() => selected ? deleteFromFavoriteMovies() : addToFavoriteMovies()}>
                                <img src={heart} className={selected ? s.redHeart : s.heartIcon} alt={'Add to favorite movies'} />
                            </div>
                        </div>
                    :
                    null
            }
        </>
    );
}
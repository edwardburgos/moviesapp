import { CardProps } from '../../extras/types';
import s from './CardCompany.module.css'
import defaultLogo from '../../img/icons/videocam-outline.svg'
import { Link } from 'react-router-dom';
import { countries } from '../../extras/globalVariables'
import { useState, useEffect } from 'react';
import heart from '../../img/icons/heart.svg'
import heartOutline from '../../img/icons/heart-outline.svg'
import { useDispatch } from 'react-redux';
import { modifyFavoriteCompanies } from '../../actions';

export default function CardCompany({ movie }: CardProps) {

    const [selected, setSelected] = useState(false)

    const dispatch = useDispatch()
    function addToFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoriteCompanies')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies)
            if (!array.filter((e: number) => e === movie.id).length) {
                array.unshift(movie.id)
                localStorage.setItem('favoriteCompanies', JSON.stringify(array))
            }
        } else {
            localStorage.setItem('favoriteCompanies', JSON.stringify([movie.id]))
        }
        setSelected(true)
    }

    function deleteFromFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoriteCompanies')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies).filter((e: number) => e !== movie.id)
            localStorage.setItem('favoriteCompanies', JSON.stringify(array))
        }
        setSelected(false)
        dispatch(modifyFavoriteCompanies(true))
    }

    useEffect(() => {
        const favoriteMovies = localStorage.getItem('favoriteCompanies')
        if (favoriteMovies) {
            if (JSON.parse(favoriteMovies).includes(movie.id)) setSelected(true)
        }
    }, [movie])

    return (
        <>
            {
                movie.id && movie.name ?
                    <div className={s.card}>
                        <div className={s.cardContent}>
                            <Link to={`/company/${movie.id}/${movie.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}><img src={movie.logo_path ? `https://image.tmdb.org/t/p/w500${movie.logo_path}` : defaultLogo} alt={movie.name} className={s.poster}></img></Link>
                            <Link className='bold block mb-0 customLink' to={`/company/${movie.id}/${movie.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>{movie.name}</Link>
                            {movie.origin_country && countries.filter(e => e.code === movie.origin_country).length ? <span className='block'>{countries.filter(e => e.code === movie.origin_country)[0].name}</span> : null}
                            <div className={s.heartIconContainer} onClick={() => selected ? deleteFromFavoriteMovies() : addToFavoriteMovies()}>
                                <img src={heart} className={selected ? s.redHeart : s.heartIcon} alt={'Add to favorite movies'} />
                                <img src={heartOutline} className={s.heartBorder} alt={'Add to favorite movies'} />
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    );
}
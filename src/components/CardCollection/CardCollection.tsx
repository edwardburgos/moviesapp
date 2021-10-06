import { CardProps } from '../../extras/types';
import s from './CardCollection.module.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { modifyFavoriteCollections } from '../../actions';
import heart from '../../img/icons/heart.svg'

export default function CardCollection({ movie }: CardProps) {

    const [selected, setSelected] = useState(false)

    const dispatch = useDispatch()
    function addToFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoriteCollections')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies)
            if (!array.filter((e: number) => e === movie.id).length) {
                array.unshift(movie.id)
                localStorage.setItem('favoriteCollections', JSON.stringify(array))
            }
        } else {
            localStorage.setItem('favoriteCollections', JSON.stringify([movie.id]))
        }
        setSelected(true)
    }

    function deleteFromFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoriteCollections')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies).filter((e: number) => e !== movie.id)
            localStorage.setItem('favoriteCollections', JSON.stringify(array))
        }
        setSelected(false)
        dispatch(modifyFavoriteCollections(true))
    }

    useEffect(() => {
        const favoriteMovies = localStorage.getItem('favoriteCollections')
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
                            <Link className={s.collectionLink} to={`/collection/${movie.id}/${movie.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>{movie.name}</Link>
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
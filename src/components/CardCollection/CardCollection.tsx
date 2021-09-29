import { CardProps } from '../../extras/types';
import s from './CardCollection.module.css'
import { Link } from 'react-router-dom';

export default function CardCollection({ movie }: CardProps) {

    return (
        <>
            {
                movie.id && movie.name ?
                    <div className={s.card}>
                        <div className={s.cardContent}>
                            <Link className={s.collectionLink} to={`/collection/${movie.id}/${movie.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>{movie.name}</Link>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    );
}
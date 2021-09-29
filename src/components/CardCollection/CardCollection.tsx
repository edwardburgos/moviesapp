import { CardProps } from '../../extras/types';
import s from './CardCollection.module.css'
import defaultPoster from '../../img/icons/alert-circle-outline.svg';
import { Link } from 'react-router-dom';
import { months } from '../../extras/globalVariables';

export default function CardCollection({ movie }: CardProps) {

    return (
        <>
            {
                movie.id && movie.name ?
                    <div className={s.card}>
                        <div className={s.cardContent}>
                            <Link className='bold block mb-0 customLink' to={`/collection/${movie.id}/${movie.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>{movie.name}</Link>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    );
}
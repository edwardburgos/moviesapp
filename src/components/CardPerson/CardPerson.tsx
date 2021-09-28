import { CardProps } from '../../extras/types';
import s from './CardPerson.module.css'
import defaultProfile from '../../img/icons/person-outline.svg';
import { Link } from 'react-router-dom';
import { months } from '../../extras/globalVariables';

export default function CardPerson({ movie }: CardProps) {

    return (
        <>
            {
                movie.id && movie.name ?
                    <div className={s.card}>
                        <div className={s.cardContent}>
                            <Link className={`${s.fullCastMember} linkDiv`} to={`/person/${movie.id}/${movie.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>
                                <img className={movie.profile_path ? s.profilePic : s.defaultProfilePic} src={movie.profile_path ? `https://image.tmdb.org/t/p/w500${movie.profile_path}` : defaultProfile} alt={movie.name}></img>
                                <div className={s.name}>
                                    <span className='bold block'>{movie.name}</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    );
}

{/* <Link key={index} className={`${s.fullCastMember} linkDiv`} to={`/person/${e.id}/${e.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>
                                                <img className={e.profile_path ? s.profilePic : s.defaultProfilePic} src={e.profile_path ? `https://image.tmdb.org/t/p/w500${e.profile_path}` : defaultProfile} alt={e.name}></img>
                                                <div className={s.name}>
                                                    <span className='bold block'>{e.name}</span>
                                                    <span>{e.character}</span>
                                                </div>
                                            </Link> */}



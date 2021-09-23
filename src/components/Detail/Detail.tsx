import { DetailProps } from '../../extras/types';
import s from './Detail.module.css'
import defaultPoster from '../../img/defaultPoster.jpg';
import { Link } from 'react-router-dom';

export default function Detail({ id }: DetailProps) {
    return (
        <div>
            <h1>{id}</h1>
        </div>
    );
}

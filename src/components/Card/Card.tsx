import { Movie } from '../../extras/types'

export default function Card({ title }: Movie) {
    return (
        <h1>{title}</h1>
    );
}

import { Movie } from '../extras/types'

export function modifyMovies(movies: Movie[]) {
    return {
        type: 'MODIFY_MOVIES',
        movies
    }
}
import { Movie } from '../extras/types';

const initialState = {
  movies: new Array<Movie>(),
}

export default function reducer(state = initialState, action: { type: string, movies: Movie[] }) {
  switch (action.type) {
    case 'MODIFY_MOVIES':
      return {
        ...state,
        movies: action.movies
      }
    default:
      return { ...state }
  }
}
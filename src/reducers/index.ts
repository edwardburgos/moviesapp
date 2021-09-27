import { Movie } from '../extras/types';

export type PossibleStates = {
  movies: Movie[] | null,
  totalPages: number,
  searchURL: string
}

const initialState = {
  movies:  null,
  totalPages: 1,
  searchURL: ''
} as PossibleStates

export default function reducer(state = initialState, action: { type: string, movies: Movie[] | null, totalPages: number, searchURL: string}) {
  switch (action.type) {
    case 'MODIFY_MOVIES':
      return {
        ...state,
        movies: action.movies
      }
    case 'MODIFY_TOTAL_PAGES':
      return {
        ...state,
        totalPages: action.totalPages
      }
    case 'MODIFY_SEARCH_URL':
      return {
        ...state,
        searchURL: action.searchURL
      }
    default:
      return { ...state }
  }
}
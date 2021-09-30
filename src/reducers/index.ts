import { Movie } from '../extras/types';

export type PossibleStates = {
  results: Movie[] | null,
  totalPages: number,
  searchURL: string,
  loading: boolean
}

const initialState = {
  results:  null,
  totalPages: 1,
  searchURL: '',
  loading: false
} as PossibleStates

export default function reducer(state = initialState, action: { type: string, results: Movie[] | null, totalPages: number, searchURL: string, loading: boolean}) {
  switch (action.type) {
    case 'MODIFY_RESULTS':
      return {
        ...state,
        results: action.results
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
    case 'MODIFY_LOADING':
      return {
        ...state,
        loading: action.loading
      }
    default:
      return { ...state }
  }
}
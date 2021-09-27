import { Movie } from '../extras/types';

export type PossibleStates = {
  results: Movie[] | null,
  totalPages: number,
  searchURL: string
}

const initialState = {
  results:  null,
  totalPages: 1,
  searchURL: ''
} as PossibleStates

export default function reducer(state = initialState, action: { type: string, results: Movie[] | null, totalPages: number, searchURL: string}) {
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
    default:
      return { ...state }
  }
}
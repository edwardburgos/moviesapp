import { Movie } from '../extras/types';

export type PossibleStates = {
  results: Movie[] | null,
  totalPages: number,
  searchURL: string,
  loading: boolean,
  currentPage: number,
  showTrendingModal: boolean,
  favoriteMovies: boolean,
  favoritePeople: boolean,
  favoriteCompanies: boolean,
  favoriteCollections: boolean
}

const initialState = {
  results: null,
  totalPages: 1,
  searchURL: '',
  loading: false,
  currentPage: 1,
  showTrendingModal: false,
  favoriteMovies: false,
  favoritePeople: false,
  favoriteCompanies: false,
  favoriteCollections: false
} as PossibleStates

export default function reducer(state = initialState, action: { type: string, results: Movie[] | null, totalPages: number, searchURL: string, loading: boolean, currentPage: number, showTrendingModal: boolean, favoriteMovies: boolean, favoritePeople: boolean, favoriteCompanies: boolean, favoriteCollections: boolean }) {
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
    case 'MODIFY_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage
      }
    case 'MODIFY_SHOW_TRENDING_MODAL':
      return {
        ...state,
        showTrendingModal: action.showTrendingModal
      }
    case 'MODIFY_FAVORITE_MOVIES':
      return {
        ...state,
        favoriteMovies: action.favoriteMovies
      }
    case 'MODIFY_FAVORITE_PEOPLE':
      return {
        ...state,
        favoritePeople: action.favoritePeople
      }
    case 'MODIFY_FAVORITE_COMPANIES':
      return {
        ...state,
        favoriteCompanies: action.favoriteCompanies
      }
    case 'MODIFY_FAVORITE_COLLECTIONS':
      return {
        ...state,
        favoriteCollections: action.favoriteCollections
      }
    default:
      return { ...state }
  }
}
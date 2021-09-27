import { Movie } from '../extras/types'

export function modifyMovies(movies: Movie[] | null) {
    return {
        type: 'MODIFY_MOVIES',
        movies
    }
}

export function modifyTotalPages(totalPages: number) {
    return {
        type: 'MODIFY_TOTAL_PAGES',
        totalPages
    }
}

export function modifySearchURL(searchTerm: string) {
    return {
        type: 'MODIFY_SEARCH_URL',
        searchURL: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}`
    }
}
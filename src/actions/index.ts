import { Movie } from '../extras/types'

export function modifyResults(results: Movie[] | null) {
    return {
        type: 'MODIFY_RESULTS',
        results
    }
}

export function modifyTotalPages(totalPages: number) {
    return {
        type: 'MODIFY_TOTAL_PAGES',
        totalPages
    }
}

export function modifySearchURL(searchURL: string) {
    return {
        type: 'MODIFY_SEARCH_URL',
        searchURL
    }
}

export function modifyLoading(loading: boolean) {
    return {
        type: 'MODIFY_LOADING',
        loading
    }
}

export function modifyCurrentPage(currentPage: number) {
    return {
        type: 'MODIFY_CURRENT_PAGE',
        currentPage
    }
}
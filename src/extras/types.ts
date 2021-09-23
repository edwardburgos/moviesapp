export type Movie = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export type CardProps = {
    movie: Movie
}

export type DetailProps = {
    id: number
}

export type MovieDetail = {
    adult: boolean,
    belongs_to_collection: {
        id: number,
        name: string
    } | null,
    budget: number,
    genres: { id: number, name: string }[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string | null,
    poster_path: string | null,
    production_companies: { id: number, name: string }[],
    release_date: string,
    revenue: number,
    status: string,
    title: string,
    vote_average: number,
    vote_count: number
}
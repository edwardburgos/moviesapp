export type Movie = {
    id: number,
    poster_path: string,
    release_date: string,
    title: string
}

export type CardProps = {
    movie: Movie
}

export type SearchProps = {
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

export type CastMember = {
    id: number,
    name: string,
    profile_path: string,
    known_for_department: string,
    character: string
}

export type MovieVideo = {
    key: string,
    site: string,
    type: string,
    official: boolean
}

export type CollectionType = {
    id: number,
    name: string,
    overview: string,
    parts: Movie[]
}

export type CompanyType = {
    description: string,
    headquarters: string,
    homepage: string,
    id: number,
    logo_path: string,
    name: string,
    origin_country: string,
    parent_company: string | null
}

export type GenreType = {
    id: number,
    name: string
}
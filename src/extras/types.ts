export type Movie = {
    id: number,
    poster_path: string | null,
    release_date: string | null,
    title: string | null,
    name: string | null,
    profile_path: string | null,
    known_for_department: string | null,
    logo_path: string | null,
    origin_country: string | null
}

export type CardProps = {
    movie: Movie
}

export type SearchProps = {
    id: number
}

export type MovieDetail = {
    id: number,
    belongs_to_collection: { id: number, name: string } | null,
    budget: number,
    genres: { id: number, name: string }[],
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

export type PersonTypeShort = {
    id: number,
    name: string,
    profile_path: string,
    known_for_department: string,
}

export type CardPersonProps = {
    person: PersonTypeShort
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
    id: number,
    description: string,
    headquarters: string,
    homepage: string,
    logo_path: string,
    name: string,
    origin_country: string
}

export type GenreType = {
    id: number,
    name: string
}

export type PersonType = {
    id: number,
    biography: string,
    birthday: string | null,
    deathday: string | null,
    gender: 0 | 1 | 2 | 3,
    name: string,
    place_of_birth: string,
    profile_path: string,
    known_for_department: string
}
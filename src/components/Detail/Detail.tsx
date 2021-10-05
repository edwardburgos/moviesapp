import { CastMember, SearchProps, MovieDetail, MovieVideo } from '../../extras/types';
import defaultPoster from '../../img/icons/alert-circle-outline.svg';
import defaultProfile from '../../img/icons/person-outline.svg';
import s from './Detail.module.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ProgressBar, Modal, AccordionCollapse } from 'react-bootstrap'
import { useEffect } from 'react';
import { useState } from 'react';
import { isoLangs } from '../../extras/globalVariables';
import loadingGif from '../../img/loadingGif.gif';
import { months } from '../../extras/globalVariables';
import { showMessage } from '../../extras/functions';
import { useDispatch } from 'react-redux'
import Card from '../Card/Card'
import { Movie } from '../../extras/types';
import heart from '../../img/icons/heart.svg'
import CardPersonDetail from '../CardPersonDetail/CardPersonDetail'


export default function Detail({ id }: SearchProps) {

    const [movie, setMovie] = useState<MovieDetail>({
        belongs_to_collection: { id: 0, name: "" },
        budget: 0, genres: [{ id: 0, name: "" }], id: 0, original_language: "en", original_title: "", overview: "",
        poster_path: "", production_companies: [{ id: 0, name: "" }], release_date: "", revenue: 0,
        status: "", title: "", vote_average: 0, vote_count: 0
    })
    const [cast, setCast] = useState<CastMember[]>([{ id: 0, name: "", profile_path: "", known_for_department: 'Acting', character: "" }])
    const [loading, setLoading] = useState(false)
    const [showAll, setShowAll] = useState(false)
    const [allCast, setAllCast] = useState<CastMember[]>([{ id: 0, name: "", profile_path: "", known_for_department: 'Acting', character: "" }])
    const [showAllCast, setShowAllCast] = useState(false)
    const [trailer, setTrailer] = useState<MovieVideo>({ key: '', site: '', type: '', official: false })
    const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
    const [selected, setSelected] = useState(false)



    const dispatch = useDispatch();

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        async function getMovieInfo() {
            try {
                setLoading(true)
                const movie = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`, { cancelToken: source.token })
                setMovie(movie.data)
                document.title = `${movie.data.title}`
                const cast = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`, { cancelToken: source.token })
                let filteredCast = []
                for (let e of cast.data.cast) {
                    if (filteredCast.length < 11) {
                        if (e.known_for_department === 'Acting') {
                            filteredCast.push(e)
                        }
                    } else { break; }
                }
                setShowAll(filteredCast.length === 11)
                setCast(filteredCast.slice(0, 10))
                const trailer = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
                const officialTrailer = trailer.data.results.filter((e: MovieVideo) => e.type === 'Trailer' && e.site === 'YouTube');
                if (officialTrailer.length) {
                    const official = officialTrailer.filter((e: MovieVideo) => e.official)
                    official.length ? setTrailer(official[0]) : setTrailer(officialTrailer[0])
                }
                const similar = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
                setSimilarMovies(similar.data.results)
                const favoriteMovies = localStorage.getItem('favoriteMovies')
                if (favoriteMovies) {
                    if (JSON.parse(favoriteMovies).includes(id)) { setSelected(true) } else { setSelected(false) }
                }
                setLoading(false)
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message === "Unmounted") return "Unmounted";
                }
                showMessage('Sorry, an error ocurred')
            }
        }
        getMovieInfo();
        return () => { source.cancel("Unmounted"); }
    }, [id, dispatch])

    async function getAllCast() {
        const cast = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setAllCast(cast.data.cast.filter((e: CastMember) => e.known_for_department === 'Acting'))
        setShowAllCast(true)
    }

    function addToFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoriteMovies')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies)
            if (!array.filter((e: number) => e === movie.id).length) {
                array.unshift(movie.id)
                localStorage.setItem('favoriteMovies', JSON.stringify(array))
            }
        } else {
            localStorage.setItem('favoriteMovies', JSON.stringify([movie.id]))
        }
        setSelected(true)
    }

    function deleteFromFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoriteMovies')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies).filter((e: number) => e !== movie.id)
            localStorage.setItem('favoriteMovies', JSON.stringify(array))
        }
        setSelected(false)
    }

    return (
        <>
            {!loading ?
                <>
                    <div className={s.container}>
                        <h1 className={s.title}>{movie.title}</h1>
                        <div className={s.leftContainer}>
                            <div className={s.posterContainer}>
                                <img className={movie.poster_path ? s.poster : s.posterDefault} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultPoster} alt={movie.title}></img>
                                <div className={selected ? s.noColor : s.heartIconContainer} onClick={() => selected ? deleteFromFavoriteMovies() : addToFavoriteMovies()}>
                                    <img src={heart} className={selected ? s.redHeart : s.heartIcon} alt={'Add to favorite movies'} />
                                </div>
                            </div>
                            {trailer.key ? <div className='text-center mb-3 w-100'><a className={`btn btn-primary ${s.buttonWidth}`} href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noreferrer">Watch trailer</a></div> : null}
                            {cast.length ?
                                <div className={s.castInfo}>
                                    <div className='w-100'><span className='bold'>Cast</span></div>
                                    <div className={s.castContainer}>
                                        {cast.map((e, index) =>
                                            <CardPersonDetail key={index} movie={e}></CardPersonDetail>
                                        )}
                                        {showAll ? <div className={s.showAllContainer}><button className='btn btn-primary' onClick={() => getAllCast()}>Show all</button></div> : null}
                                    </div>
                                </div> : null}
                        </div>
                        <div className={s.info}>
                            {movie.overview ?
                                <div className={s.votesOverview}>
                                    {movie.vote_average && movie.vote_count ?
                                        <div className={s.votesContainer}>
                                            <div className={(movie.vote_average * 10) > 70 ? s.votesGreen : (movie.vote_average * 10) < 40 ? s.votesRed : s.votes}>
                                                <span>{movie.vote_average * 10}</span><span className={s.percentageSymbol}>%</span>
                                            </div>
                                            <span className='block'>{movie.vote_count}</span>
                                            <span className='block'>votes</span>
                                        </div>
                                        : null
                                    }
                                    <div>
                                        <span className='bold'>Overview</span>
                                        <p>{movie.overview}</p>
                                    </div>
                                </div> : null}
                            {movie.status !== 'Canceled' && movie.release_date ?
                                <>
                                    <span className='bold'>Release date</span>
                                    <p>{`${movie.release_date.split('-')[2]} ${months[parseInt(movie.release_date.split('-')[1]) - 1]} ${movie.release_date.split('-')[0]}`}</p>

                                </> : null}
                            {movie.status !== 'Released' ?
                                <>
                                    <span className='bold'>Current state</span>
                                    <p>{movie.status === 'Post Production' ? 'In ' : ''}{movie.status}</p>
                                </> : null}
                            {movie.title !== movie.original_title ?
                                <>
                                    <span className='bold'>Original Title</span>
                                    <p>{movie.original_title}</p>
                                    <span className='bold'>Original Language</span>
                                    <p>{isoLangs[movie.original_language].name}</p>
                                </> : null}
                            {movie.belongs_to_collection ?
                                <>
                                    <span className='bold'>Collection</span>
                                    <div className='mb-2'><Link className='btn btn-primary customLink block m-2' to={`/collection/${movie.belongs_to_collection.id}/${movie.belongs_to_collection.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>{movie.belongs_to_collection.name}</Link></div>
                                </> : null}
                            {movie.genres.length !== 0 ?
                                movie.genres.length === 1 ?
                                    <>
                                        <span className='bold'>Genre</span>
                                        <div className='mb-2'><Link className='btn btn-primary customLink block m-2' to={`/genre/${movie.genres[0].id}/${movie.genres[0].name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>{movie.genres[0].name}</Link></div>
                                    </>
                                    :
                                    <>
                                        <span className='bold'>Genres</span>
                                        <div className='mb-2'>{movie.genres.map((e, index) => <Link key={index} className='btn btn-primary customLink block m-2' to={`/genre/${e.id}/${e.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>{e.name}</Link>)}</div>
                                    </>
                                : null
                            }
                            {
                                movie.production_companies.length !== 0 ?
                                    movie.production_companies.length === 1 ?
                                        <>
                                            <span className='bold'>Production company</span>
                                            <div className='mb-2'><Link className='btn btn-primary customLink block m-2' to={`/company/${movie.production_companies[0].id}/${movie.production_companies[0].name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>{movie.production_companies[0].name}</Link></div>
                                        </>
                                        :
                                        <>
                                            <span className='bold'>Production companies</span>
                                            <div className='mb-2'>{movie.production_companies.map((e, index) => <Link key={index} className='btn btn-primary customLink block m-2' to={`/company/${e.id}/${e.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>{e.name}</Link>)}</div>
                                        </>
                                    : null
                            }
                            {movie.budget ?
                                <>
                                    <span className='bold'>Budget</span>
                                    <p>$ {movie.budget.toLocaleString()}</p>
                                </> : null}
                            {movie.revenue ?
                                <>
                                    <span className='bold'>Revenue</span>
                                    <p>$ {movie.revenue.toLocaleString()}</p>
                                </> : null}
                        </div>
                        {
                            similarMovies.length ?
                                <div className={s.castInfo}>
                                    <p className='w-100 bold mb-2'>Similar movies</p>
                                    <div className={s.similarMoviesContainer}>
                                        {similarMovies.map((e, index) =>
                                            <Card key={index} movie={e}></Card>
                                        )}
                                    </div>
                                </div>
                                :
                                null
                        }
                    </div>

                    <Modal
                        show={showAllCast}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        size="xl"
                        keyboard={false}
                        onHide={() => setShowAllCast(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Cast
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={s.modalBody}>
                            {
                                allCast.length ?
                                    <div className={s.fullCastContainer}>
                                        {allCast.map((e, index) =>
                                            <Link key={index} className={`${s.fullCastMember} linkDiv`} to={`/person/${e.id}/${e.name.toLowerCase().replace(/[^0-9a-z-A-Z ]/g, "").replaceAll(' ', '-')}`}>
                                                <img className={e.profile_path ? s.profilePic : s.defaultProfilePic} src={e.profile_path ? `https://image.tmdb.org/t/p/w500${e.profile_path}` : defaultProfile} alt={e.name}></img>
                                                <div className={s.name}>
                                                    <span className='bold block'>{e.name}</span>
                                                    <span>{e.character}</span>
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                    :
                                    null
                            }
                        </Modal.Body>
                    </Modal>
                </>
                :
                <div className='contentCenter'>
                    <img className='loading' src={loadingGif} alt='loadingGif'></img>
                </div>
            }
        </>
    );
}

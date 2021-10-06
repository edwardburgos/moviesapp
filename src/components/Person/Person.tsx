import { SearchProps, PersonType, Movie } from "../../extras/types"
import axios from "axios"
import { useState, useEffect } from "react"
import s from "./Person.module.css"
import Card from "../Card/Card"
import loadingGif from '../../img/loadingGif.gif';
import defaultProfile from '../../img/icons/person-outline.svg';
import { Carousel } from 'react-bootstrap'
import { showMessage } from "../../extras/functions"
import { Form } from 'react-bootstrap';
import closeCircle from '../../img/icons/close-circle-outline.svg';
import { sortingOptions, months } from "../../extras/globalVariables"
import { modifyResults, modifyTotalPages, modifySearchURL, modifyLoading, modifyCurrentPage } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import PaginationComponent from "../PaginationComponent/PaginationComponent"
import moment from 'moment'
import heart from '../../img/icons/heart.svg'
import { modifyFavoritePeople } from '../../actions';
import { useHistory, useLocation } from "react-router"

export default function Person({ id }: SearchProps) {

    const results = useSelector((state: { results: null | Movie[] }) => state.results)
    const loading = useSelector((state: { loading: boolean }) => state.loading)

    const [person, setPerson] = useState<PersonType>({
        id: 0, biography: "", birthday: "", deathday: "", known_for_department: "",
        gender: 0, name: "", place_of_birth: "", profile_path: ""
    })

    const [initialLoading, setInitialLoading] = useState(false)
    const [photos, setPhotos] = useState<string[]>([])
    const [sorting, setSorting] = useState('popularity.desc')
    const [selected, setSelected] = useState(false)

    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery()
    const sortingQuery = query.get('sortBy');

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        async function getCollection() {
            try {
                setInitialLoading(true)
                const person = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                setPerson(person.data)
                document.title = `${person.data.name}`
                const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US${sortingQuery ? `&sort_by=${sortingQuery}` : ''}&with_people=${id}&page=`
                const results = await axios.get(`${url}1`);
                dispatch(modifySearchURL(url))
                dispatch(modifyResults(results.data.results))
                dispatch(modifyTotalPages(results.data.total_pages))
                const photos = await axios.get(`https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`)
                setPhotos(photos.data.profiles.map((e: { file_path: string }) => e.file_path).filter((e: string) => e))
                setInitialLoading(false)
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message === "Unmounted") return "Unmounted";
                }
                showMessage('Sorry, an error ocurred')
            }
        }
        getCollection();
        const favoriteMovies = localStorage.getItem('favoritePeople')
        if (favoriteMovies) {
            if (JSON.parse(favoriteMovies).includes(id)) { setSelected(true) } else { setSelected(false) }
        }
        return () => {
            source.cancel("Unmounted");
            dispatch(modifySearchURL(''))
            dispatch(modifyResults(null))
            dispatch(modifyTotalPages(1))
            dispatch(modifyLoading(false))
            dispatch(modifyCurrentPage(1))
        }
    }, [dispatch, id, sortingQuery])

    function addToFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoritePeople')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies)
            if (!array.filter((e: number) => e === id).length) {
                array.unshift(id)
                localStorage.setItem('favoritePeople', JSON.stringify(array))
            }
        } else {
            localStorage.setItem('favoritePeople', JSON.stringify([id]))
        }
        setSelected(true)
    }

    function deleteFromFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoritePeople')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies).filter((e: number) => e !== id)
            localStorage.setItem('favoritePeople', JSON.stringify(array))
        }
        setSelected(false)
        dispatch(modifyFavoritePeople(true))
    }


    // This hooks acts when genre or sortingQuery change
    useEffect(() => {
        async function sortBy(sortParameter: string) {
            dispatch(modifyLoading(true))
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=${sortParameter}&with_people=${id}&page=`
            const results = await axios.get(`${url}1`)
            dispatch(modifySearchURL(url))
            dispatch(modifyCurrentPage(1))
            dispatch(modifyResults(results.data.results))
            dispatch(modifyTotalPages(results.data.total_pages))
            dispatch(modifyLoading(false))
        }
        sortBy(sorting);
    }, [dispatch, id, sorting])

    // This hook allows us to search data using the url
    useEffect(() => {
        sortingQuery ? setSorting(sortingQuery) : setSorting('popularity.desc')
    }, [sortingQuery])


    return (
        <>
            {!initialLoading ?
                <div className={s.container}>
                    <div className={s.firstSection}>
                        <div className={s.left}>
                            <div className={s.photosContainer}>
                                {photos.length > 1 ?
                                    <Carousel className={s.profilePic}>
                                        {
                                            photos.map((e, index) =>
                                                <Carousel.Item key={index}>
                                                    <img
                                                        className={s.profilePic}
                                                        src={`https://image.tmdb.org/t/p/w500${e}`}
                                                        alt={`Slide number ${index}`}
                                                    />
                                                </Carousel.Item>
                                            )
                                        }
                                    </Carousel>
                                    :
                                    <img className={person.profile_path ? s.profilePic : s.defaultProfilePic} src={person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : defaultProfile} alt={person.name}></img>
                                }
                                <div className={selected ? s.noColor : s.heartIconContainer} onClick={() => selected ? deleteFromFavoriteMovies() : addToFavoriteMovies()}>
                                    <img src={heart} className={selected ? s.redHeart : s.heartIcon} alt={'Add to favorite movies'} />
                                </div>
                            </div>
                        </div>
                        <div className={s.right}>
                            <div>
                                <h1 className='w-100 text-center'>{person.name}</h1>
                                {person.known_for_department ? <><span className='w-100 bold'>Known for department</span><p>{person.known_for_department}</p></> : null}
                                {person.birthday ?
                                    <>
                                        <span className='w-100 bold'>Age</span>
                                        <p>{moment().diff(person.birthday, 'years', false)}</p>
                                        <span className='w-100 bold'>Birthday</span>
                                        <p>{`${person.birthday.split('-')[2]} ${months[parseInt(person.birthday.split('-')[1]) - 1]} ${person.birthday.split('-')[0]}`}</p>
                                    </>
                                    : null}
                                {person.deathday ? <><span className='w-100 bold'>Deathday</span><p>{person.deathday}</p></> : null}
                                {person.place_of_birth ? <><span className='w-100 bold'>Place of birth</span><p>{person.place_of_birth}</p></> : null}
                                {person.biography ? <><span className='w-100 bold'>Biography</span><p>{person.biography}</p></> : null}
                                {person.gender ? <><span className='w-100 bold'>Gender</span>{person.gender === 1 ? <p>Female</p> : person.gender === 2 ? <p>Male</p> : person.gender === 3 ? <p>Non-binary</p> : null}</> : null}
                            </div>
                        </div>
                        <h2 className='w-100 mb-3 text-center'>Movies</h2>
                        <div className={s.selectContainer}>
                            <Form.Select className={s.selectInput} aria-label="Default select example" value={sorting} onChange={(e) => { const target = e.target as HTMLSelectElement; setSorting(target.value); history.push(`${location.pathname}?sortBy=${target.value}`) }}>
                                {sortingOptions.map(e => <option key={e.value} value={e.value}>{e.complete}</option>)}
                            </Form.Select>
                            <div className={sorting === 'popularity.desc' ? s.invisible : s.iconContainer}>
                                <img src={closeCircle} className={sorting === 'popularity.desc' ? s.invisible : s.iconDumb} onClick={() => { setSorting('popularity.desc'); }} alt={'Remove selected sorting'} />
                            </div>
                        </div>
                    </div>
                    <div className={results ? s.resultsPagination : s.noResultsPagination}>
                        {results ?
                            !loading ?
                                <div className={s.cardsContainerFull}>
                                    {results.length ?
                                        <>{results.map((e, index) => <Card key={index} movie={e}></Card>)}</>
                                        :
                                        null
                                    }
                                </div>
                                :
                                <div className={s.loadingContainer}>
                                    <img className='loading' src={loadingGif} alt='loadingGif'></img>
                                </div>
                            :
                            loading ?
                                <div className={s.loadingContainer}>
                                    <img className='loading' src={loadingGif} alt='loadingGif'></img>
                                </div>
                                :
                                null
                        }
                        {results && results.length ? <PaginationComponent origin='' /> : null}
                    </div>
                </div>
                :
                <div className='contentCenter'>
                    <img className='loading' src={loadingGif} alt='loadingGif'></img>
                </div>
            }
        </>
    )
}
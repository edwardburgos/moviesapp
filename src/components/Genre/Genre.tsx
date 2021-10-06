import { SearchProps } from "../../extras/types"
import { useState, useEffect } from "react"
import { Movie, GenreType } from "../../extras/types"
import axios from "axios"
import s from './Genre.module.css'
import Card from "../Card/Card"
import loadingGif from '../../img/loadingGif.gif';
import { showMessage } from "../../extras/functions";
import { Form } from 'react-bootstrap';
import closeCircle from '../../img/icons/close-circle-outline.svg';
import { sortingOptions } from "../../extras/globalVariables"
import PaginationComponent from '../PaginationComponent/PaginationComponent'
import { useSelector, useDispatch } from 'react-redux'
import { modifyResults, modifyTotalPages, modifySearchURL, modifyLoading, modifyCurrentPage } from '../../actions'
import { useHistory, useLocation } from "react-router"

export default function Genre({ id }: SearchProps) {

    const results = useSelector((state: { results: null | Movie[] }) => state.results)
    const loading = useSelector((state: { loading: boolean }) => state.loading)

    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery()
    const sortingQuery = query.get('sortBy');

    const [genreName, setGenreName] = useState('')
    const [sorting, setSorting] = useState('popularity.desc')
    const [initialLoading, setInitialLoading] = useState(false)

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        async function getCollection() {
            try {
                setInitialLoading(true)
                const genres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                const genreName = genres.data.genres.filter((e: GenreType) => e.id === id)[0].name
                setGenreName(genreName)
                document.title = `${genreName} Movies`
                const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US${sortingQuery ? `&sort_by=${sortingQuery}` : ''}&with_genres=${id}&page=`
                const results = await axios.get(`${url}1`);
                dispatch(modifySearchURL(url))
                dispatch(modifyResults(results.data.results))
                dispatch(modifyTotalPages(results.data.total_pages))
                setInitialLoading(false)
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message === "Unmounted") return "Unmounted";
                }
                showMessage('Sorry, an error ocurred')
            }
        }
        getCollection();
        return () => {
            source.cancel("Unmounted");
            dispatch(modifySearchURL(''))
            dispatch(modifyResults(null))
            dispatch(modifyTotalPages(1))
            dispatch(modifyLoading(false))
            dispatch(modifyCurrentPage(1))
        }
    }, [dispatch, id, sortingQuery])


    // This hooks acts when genre or sortingQuery change
    useEffect(() => {
        async function sortBy(sortParameter: string) {
            dispatch(modifyLoading(true))
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=${sortParameter}&with_genres=${id}&page=`
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
                <div className='flexCentered'>
                    <h1 className='w-100 text-center'>{genreName} Movies</h1>
                    <div className={s.selectContainer}>
                        <Form.Select className={s.selectInput} aria-label="Default select example" value={sorting} onChange={(e) => { const target = e.target as HTMLSelectElement; setSorting(target.value); history.push(`${location.pathname}?sortBy=${target.value}`) }}>
                            {sortingOptions.map(e => <option key={e.value} value={e.value}>{e.complete}</option>)}
                        </Form.Select>
                        <div className={sorting === 'popularity.desc' ? s.invisible : s.iconContainer}>
                            <img src={closeCircle} className={sorting === 'popularity.desc' ? s.invisible : s.iconDumb} onClick={() => { setSorting('popularity.desc'); }} alt={'Remove selected sorting'} />
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
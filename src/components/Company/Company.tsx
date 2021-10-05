import axios from "axios"
import { useEffect, useState } from "react"
import { Movie, SearchProps, CompanyType } from "../../extras/types"
import defaultLogo from '../../img/icons/videocam-outline.svg'
import s from './Company.module.css'
import loadingGif from '../../img/loadingGif.gif';
import Card from "../Card/Card"
import { showMessage } from "../../extras/functions"
import { countries, sortingOptions } from "../../extras/globalVariables"
import { Form } from 'react-bootstrap';
import closeCircle from '../../img/icons/close-circle-outline.svg';
import { modifyResults, modifyTotalPages, modifySearchURL, modifyLoading, modifyCurrentPage } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import PaginationComponent from "../PaginationComponent/PaginationComponent"
import heart from '../../img/icons/heart.svg'
import { modifyFavoriteCompanies } from '../../actions';




export default function Company({ id }: SearchProps) {

    const results = useSelector((state: { results: null | Movie[] }) => state.results)
    const loading = useSelector((state: { loading: boolean }) => state.loading)

    const [company, setCompany] = useState<CompanyType>({
        description: "", headquarters: "", homepage: "",
        id: 0, logo_path: "", name: "", origin_country: ""
    })
    const [initialLoading, setInitialLoading] = useState(false)
    const [sorting, setSorting] = useState('popularity.desc')

    const [selected, setSelected] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        async function getCompany() {
            try {
                setInitialLoading(true)
                const company = await axios.get(`https://api.themoviedb.org/3/company/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
                setCompany(company.data)
                document.title = `${company.data.name}`
                const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&with_companies=${id}&page=`
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
        getCompany();
        return () => {
            source.cancel("Unmounted");
            dispatch(modifySearchURL(''))
            dispatch(modifyResults(null))
            dispatch(modifyTotalPages(1))
            dispatch(modifyLoading(false))
            dispatch(modifyCurrentPage(1))
        }
    }, [id])

    async function sortBy(sortParameter: string) {
        dispatch(modifyLoading(true))
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=${sortParameter}&with_companies=${id}&page=`
        const results = await axios.get(`${url}1`)
        dispatch(modifySearchURL(url))
        dispatch(modifyCurrentPage(1))
        dispatch(modifyResults(results.data.results))
        dispatch(modifyTotalPages(results.data.total_pages))
        dispatch(modifyLoading(false))
    }


    function addToFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoriteCompanies')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies)
            if (!array.filter((e: number) => e === id).length) {
                array.unshift(id)
                localStorage.setItem('favoriteCompanies', JSON.stringify(array))
            }
        } else {
            localStorage.setItem('favoriteCompanies', JSON.stringify([id]))
        }
        setSelected(true)
    }

    function deleteFromFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoriteCompanies')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies).filter((e: number) => e !== id)
            localStorage.setItem('favoriteCompanies', JSON.stringify(array))
        }
        setSelected(false)
        dispatch(modifyFavoriteCompanies(true))
    }

    useEffect(() => {
        const favoriteMovies = localStorage.getItem('favoriteCompanies')
        if (favoriteMovies) {
            if (JSON.parse(favoriteMovies).includes(id)) setSelected(true)
        }
    }, [])

    return (
        <>
            {!initialLoading ?
                <div className={s.container}>
                    <div className={s.firstSection}>
                        <div className={s.companyInfo}>
                            <div className={s.left}>
                                <div className={s.logoContainer}>
                                    <img className={s.logo} src={company.logo_path ? `https://image.tmdb.org/t/p/w500${company.logo_path}` : defaultLogo} alt={company.name}></img>
                                    <div className={selected ? s.noColor : s.heartIconContainer} onClick={() => selected ? deleteFromFavoriteMovies() : addToFavoriteMovies()}>
                                        <img src={heart} className={selected ? s.redHeart : s.heartIcon} alt={'Add to favorite movies'} />
                                    </div>
                                </div>
                            </div>
                            <div className={s.right}>
                                <div>
                                    <h1 className='w-100'>{company.name}</h1>
                                    {company.description ? <><span className='w-100 bold'>Description</span><p className='w-100'>{company.description}</p></> : null}
                                    {company.headquarters ? <><span className='w-100 bold'>Headquarters</span><p className='w-100'>{company.headquarters}</p></> : null}
                                    {company.origin_country && countries.filter(e => e.code === company.origin_country).length ? <><span className='w-100 bold'>Origin country</span><p className='w-100'>{countries.filter(e => e.code === company.origin_country)[0].name}</p></> : null}
                                    {company.homepage ? <a className='btn btn-primary' href={company.homepage} target="_blank" rel="noreferrer">Visit website</a> : null}
                                </div>
                            </div>
                        </div>
                        <h2 className='w-100 mb-3 text-center'>Movies</h2>
                        <div className={s.selectContainer}>
                            <Form.Select className={s.selectInput} aria-label="Default select example" value={sorting} onChange={(e) => { const target = e.target as HTMLSelectElement; sortBy(target.value); setSorting(target.value) }}>
                                {sortingOptions.map(e => <option key={e.value} value={e.value}>{e.complete}</option>)}
                            </Form.Select>
                            <div className={sorting === 'popularity.desc' ? s.invisible : s.iconContainer}>
                                <img src={closeCircle} className={sorting === 'popularity.desc' ? s.invisible : s.iconDumb} onClick={() => { sortBy('popularity.desc'); setSorting('popularity.desc'); }} alt={'Remove selected sorting'} />
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
import { useEffect, useState } from 'react';
import s from './Search.module.css';
import { Form, ToggleButton, ButtonGroup } from 'react-bootstrap';
import closeCircle from '../../img/icons/close-circle-outline.svg';
import search from '../../img/icons/search-outline.svg';
import axios from 'axios';
import { showMessage } from '../../extras/functions';
import Card from '../Card/Card'
import { Movie } from '../../extras/types';
import loadingGif from '../../img/loadingGif.gif';
import noResults from '../../img/noResults.svg';
import PaginationComponent from '../PaginationComponent/PaginationComponent'
import { useDispatch, useSelector } from 'react-redux'
import { modifyTotalPages, modifySearchURL, modifyResults, modifyLoading } from '../../actions';
import { genres, sortingOptions } from '../../extras/globalVariables';
import CardPerson from '../CardPerson/CardPerson'
import CardCompany from '../CardCompany/CardCompany';
import CardCollection from '../CardCollection/CardCollection';

export default function SearchBar() {

    const results = useSelector((state: { results: null | Movie[] }) => state.results)
    const loading = useSelector((state: { loading: boolean }) => state.loading)


    const [genre, setGenre] = useState('')
    const [title, setTitle] = useState<string>('');
    const [radioValue, setRadioValue] = useState('1');
    const radios = [
        { name: 'Movies', nameSingular: 'movie', search: 'Search a movie', value: '1' },
        { name: 'People', nameSingular: 'person', search: 'Search a person', value: '2' },
        { name: 'Companies', nameSingular: 'company', search: 'Search a company', value: '3' },
        { name: 'Collections', nameSingular: 'collection', search: 'Search a collection', value: '4' },
        { name: 'Genres', nameSingular: 'genre', value: '5' }
    ];
    const [sorting, setSorting] = useState('popularity.desc')

    useEffect(() => {
        document.title = `Movies app`
    }, [])

    const dispatch = useDispatch();

    async function searchData(title: string) {
        try {
            dispatch(modifyLoading(true))
            const url = `https://api.themoviedb.org/3/search/${radios.filter(e => e.value === radioValue)[0].nameSingular}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${title}&page=`
            const results = await axios.get(`${url}1`)
            dispatch(modifySearchURL(url))
            dispatch(modifyResults(results.data.results))
            dispatch(modifyTotalPages(results.data.total_pages))
            dispatch(modifyLoading(false))
        } catch (e) {
            console.log(e)
            showMessage('Sorry, an error ocurred')
        }
    }

    useEffect(() => {
        if (radioValue === '5') { setTitle(''); dispatch(modifyResults(null)); } else { if (title) searchData(title) }
        setGenre('')
        return () => { dispatch(modifyResults(null)); dispatch(modifyTotalPages(1)); dispatch(modifySearchURL('')) }
    }, [dispatch, radioValue])

    useEffect(() => {
        setSorting('popularity.desc')
    }, [genre])

    async function searchByGenre(genreId: string) {
        try {
            dispatch(modifyLoading(true))
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&with_genres=${genreId}&page=`
            const results = await axios.get(`${url}1`)
            dispatch(modifySearchURL(url))
            dispatch(modifyResults(results.data.results))
            dispatch(modifyTotalPages(results.data.total_pages))
            dispatch(modifyLoading(false))
        } catch (e) {
            console.log(e)
            showMessage('Sorry, an error ocurred')
        }
    }

    async function sortBy(sortParameter: string) {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=${sortParameter}&page=1&with_genres=${genre}`
        const results = await axios.get(url)
        dispatch(modifyResults(results.data.results))
    }

    return (
        <div className='flexCentered'>
            <div className={`${s.test} ${results ? 'mb-3' : ''}`}>
                <ButtonGroup id='searchType'>
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant='outline-primary'
                            className='mb-3'
                            name="radio"
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
                {
                    ['1', '2', '3', '4'].includes(radioValue) ?
                        <div className={s.searchInput}>
                            <Form.Control value={title} className={s.input} placeholder={radios.filter(e => e.value === radioValue)[0].search} onChange={e => { setTitle(e.target.value); e.target.value ? searchData(e.target.value) : dispatch(modifyResults(null)) }} />
                            <img src={title ? closeCircle : search} className={s.iconDumb} onClick={() => { setTitle(''); dispatch(modifyResults(null)); }} alt={title ? 'Remove movie title' : 'Search a movie'} />
                        </div>
                        :
                        <>
                            <div className={s.selectContainer}>
                                <Form.Select aria-label="Default select example" value={genre} onChange={(e) => { const target = e.target as HTMLSelectElement; searchByGenre(target.value); setGenre(target.value) }}>
                                    {genre ? null : <option>Select a movie genre</option>}
                                    {genres.map(e => <option value={e.id} key={e.id}>{e.name}</option>)}
                                </Form.Select>
                                <div className={genre === '' ? s.invisible : s.iconContainer}>
                                    <img src={closeCircle} className={genre === '' ? s.invisible : s.selectIconDumb} onClick={() => { dispatch(modifyResults(null)); setGenre(''); }} alt={'Remove selected genre'} />
                                </div>
                            </div>
                            {
                                results && results.length ?
                                    <div className={s.selectSortingContainer}>
                                        <Form.Select className={s.selectInput} aria-label="Default select example" value={sorting} onChange={(e) => { const target = e.target as HTMLSelectElement; sortBy(target.value); setSorting(target.value) }}>
                                            {sortingOptions.map(e => <option key={e.value} value={e.value}>{e.complete}</option>)}
                                        </Form.Select>
                                        <div className={sorting === 'popularity.desc' ? s.invisible : s.iconContainer}>
                                            <img src={closeCircle} className={sorting === 'popularity.desc' ? s.invisible : s.iconDumb} onClick={() => { sortBy('popularity.desc'); setSorting('popularity.desc'); }} alt={'Remove selected sorting'} />
                                        </div>
                                    </div>
                                    : null
                            }
                        </>
                }
            </div>
            <div className={results ? s.resultsPagination : s.noResultsPagination}>
                {results ?
                    !loading ?
                        <div className={s.cardsContainerFull}>
                            {results.length ?
                                <>
                                    {results.map((e, index) =>
                                        e.id && (e.name || e.title) ?
                                            ['1', '5'].includes(radioValue) ?
                                                <Card key={index} movie={e}></Card>
                                                :
                                                radioValue === '3' ?
                                                    <CardCompany key={index} movie={e}></CardCompany>
                                                    :
                                                    radioValue === '4' ?
                                                        <CardCollection key={index} movie={e}></CardCollection>
                                                        :
                                                        <CardPerson key={index} movie={e}></CardPerson>
                                            : null)}
                                </>
                                :
                                <div className={s.noResultsContainer}>
                                    <div>
                                        <img className={s.noResults} src={noResults} alt='noResults'></img>
                                        <p className='bold mb-0 text-center'>No results found</p>
                                    </div>
                                </div>
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
                {results && results.length ? <PaginationComponent /> : null}
            </div>
        </div>
    )
}
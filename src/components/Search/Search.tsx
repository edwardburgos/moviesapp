import { useEffect, useState } from 'react';
import s from './Search.module.css';
import { Form, ToggleButton, ButtonGroup, Modal } from 'react-bootstrap';
import closeCircle from '../../img/icons/close-circle-outline.svg';
import search from '../../img/icons/search-outline.svg';
import axios from 'axios';
import { showMessage } from '../../extras/functions';
import Card from '../Card/Card'
import { Movie, SearchComponentProps } from '../../extras/types';
import loadingGif from '../../img/loadingGif.gif';
import noResults from '../../img/noResults.svg';
import PaginationComponent from '../PaginationComponent/PaginationComponent'
import { useDispatch, useSelector } from 'react-redux'
import { modifyTotalPages, modifySearchURL, modifyResults, modifyLoading, modifyCurrentPage } from '../../actions';
import { genres, sortingOptions } from '../../extras/globalVariables';
import CardPerson from '../CardPerson/CardPerson'
import CardCompany from '../CardCompany/CardCompany';
import CardCollection from '../CardCollection/CardCollection';
import config from '../../img/icons/options-outline.svg'
import { useHistory, useLocation } from 'react-router-dom';

export default function SearchBar({ type, searchedGenre }: SearchComponentProps) {

    const results = useSelector((state: { results: null | Movie[] }) => state.results)
    const loading = useSelector((state: { loading: boolean }) => state.loading)

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery()
    const searchQuery = query.get('search');
    const sortingQuery = query.get('sortBy');

    const [genre, setGenre] = useState('')
    const [title, setTitle] = useState('');
    const radios = [
        { name: 'Movies', nameSingular: 'movie', search: 'Search a movie', value: '1' },
        { name: 'People', nameSingular: 'person', search: 'Search a person', value: '2' },
        { name: 'Companies', nameSingular: 'company', search: 'Search a company', value: '3' },
        { name: 'Collections', nameSingular: 'collection', search: 'Search a collection', value: '4' },
        { name: 'Genres', nameSingular: 'genre', value: '5' }
    ];

    const [radioValue, setRadioValue] = useState('1');
    const [sorting, setSorting] = useState('popularity.desc')
    const [showSorting, setShowSorting] = useState(false)
    const [used, setUsed] = useState(false)

    const dispatch = useDispatch();
    const history = useHistory();


    async function searchData(title: string) {
        try {
            dispatch(modifyLoading(true))
            const url = `https://api.themoviedb.org/3/search/${radios.filter(e => e.value === radioValue)[0].nameSingular}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${title}&page=`
            const results = await axios.get(`${url}1`)
            dispatch(modifySearchURL(url))
            dispatch(modifyResults(results.data.results))
            dispatch(modifyTotalPages(results.data.total_pages))
            dispatch(modifyCurrentPage(1)); 
            dispatch(modifyLoading(false))
        } catch (e) {
            showMessage('Sorry, an error ocurred')
        }
    }

    // This hook change the document title
    useEffect(() => {
        document.title = `Movies app`
        return () => {
            dispatch(modifySearchURL(''))
            dispatch(modifyResults(null))
            dispatch(modifyTotalPages(1))
            dispatch(modifyLoading(false))
            dispatch(modifyCurrentPage(1))
        }
    }, [dispatch])

    // This hook allows us to handle the changes of radioValue state
    useEffect(() => {
        if (radioValue === '5') {
            setUsed(false);
            setTitle('');
            dispatch(modifyResults(null));
        } else {
            if (title) {
                setUsed(true);
                searchData(title);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, radioValue])

    // This hooks acts when title changes
    useEffect(() => {
        if (title) { setUsed(true); searchData(title); } else { setUsed(false) }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title])

    // This hooks acts when genre or sortingQuery change
    useEffect(() => {
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
                showMessage('Sorry, an error ocurred')
            }
        }
        async function sortBy(sortParameter: string) {
            try {
                dispatch(modifyLoading(true))
                const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=${sortParameter}&page=1&with_genres=${genre}`
                const results = await axios.get(url)
                dispatch(modifyResults(results.data.results))
                dispatch(modifyLoading(false))
            } catch (e) {
                showMessage('Sorry, an error ocurred')
            }
        }
        if (genre) { setUsed(true); searchByGenre(genre); } else { setUsed(false) }
        if (genre && sorting) { sortBy(sorting); }
    }, [dispatch, genre, sorting])

    // This hook allows us to search data using the url
    useEffect(() => {
        if (type) setRadioValue(radios.filter(e => e.name.toLowerCase() === type)[0].value);
        searchQuery ? setTitle(searchQuery) : setTitle('')
        searchedGenre ? setGenre(`${genres.filter(e => e.name.toLowerCase() === searchedGenre)[0].id}`) : setGenre('')
        searchedGenre && sortingQuery ? setSorting(sortingQuery) : setSorting('popularity.desc')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, searchQuery, searchedGenre, sortingQuery])

    return (
        <>
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
                                name="searchType"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => { radio.name === 'Genres' ? history.push('/genres') : history.push(`/${radio.name.toLowerCase()}${title ? `/?search=${title}` : ''}`); setRadioValue(radio.value); dispatch(modifySearchURL('')); dispatch(modifyCurrentPage(1)); 
                                dispatch(modifyTotalPages(1)); dispatch(modifyLoading(false));  }}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                    {
                        ['1', '2', '3', '4'].includes(radioValue) ?
                            <div className={s.searchInput}>
                                <Form.Control value={title} className={s.input} placeholder={radios.filter(e => e.value === radioValue)[0].search} onChange={e => { e.target.value ? setUsed(true) : setUsed(false); setTitle(e.target.value); e.target.value ? history.push(`/${radios.filter(e => e.value === radioValue)[0].name.toLowerCase()}?search=${e.target.value}`) : history.push(`/${radios.filter(e => e.value === radioValue)[0].name.toLowerCase()}`); e.target.value ? searchData(e.target.value) : dispatch(modifyResults(null)) }} />
                                <img src={title ? closeCircle : search} className={s.iconDumb} onClick={() => { setUsed(false); setTitle(''); history.push(`/${radios.filter(e => e.value === radioValue)[0].name.toLowerCase()}`); dispatch(modifyResults(null)); }} alt={title ? 'Remove movie title' : 'Search a movie'} />
                            </div>
                            :
                            <div className={s.selectParentContainer}>
                                <div className={results && results.length ? s.selectContainer : s.fullSelectContainer}>
                                    <Form.Select aria-label="Default select example" value={genre} onChange={(e) => { const target = e.target as HTMLSelectElement; setGenre(target.value); setUsed(true); setGenre(target.value); history.push(`/genres/${genres.filter(e => e.id === parseInt(target.value))[0].name.toLowerCase()}`) }}>
                                        {genre ? null : <option>Select a movie genre</option>}
                                        {genres.map((e, index) => <option value={e.id} key={index}>{e.name}</option>)}
                                    </Form.Select>
                                    <div className={genre === '' ? s.invisible : s.iconContainer}>
                                        <img src={closeCircle} className={genre === '' ? s.invisible : s.selectIconDumb} onClick={() => { dispatch(modifyResults(null)); setGenre(''); history.push('/genres') }} alt={'Remove selected genre'} />
                                    </div>
                                </div>
                                {
                                    results && results.length ?
                                        <img src={config} className={s.configIcon} onClick={() => { setShowSorting(true) }} alt={'Apply sorting'} />
                                        : null
                                }
                            </div>
                    }
                </div>
                <div className={used ? s.resultsPagination : s.noResultsPagination}>
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
                    {results && results.length ? <PaginationComponent origin='' /> : null}
                </div>
            </div>

            <Modal
                show={showSorting}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
                keyboard={false}
                onHide={() => setShowSorting(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Select a sorting option
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className={s.modalForm}>
                        <Form>
                            <div key='default-radio'>
                                {
                                    sortingOptions.map((e, index) =>
                                        <Form.Check
                                            type='radio'
                                            id={e.value}
                                            key={index}
                                            checked={e.value === sorting}
                                            label={e.complete}
                                            name="sortingOptions"
                                            onChange={() => { setSorting(e.value); setShowSorting(false); history.push(`/genres/${searchedGenre}?sortBy=${e.value}`) }}
                                        />
                                    )
                                }
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
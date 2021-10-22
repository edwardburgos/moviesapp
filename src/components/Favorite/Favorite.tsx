import { FavoriteProps } from '../../extras/types';
import s from './Favorite.module.css'
import { useDispatch, useSelector } from 'react-redux';
import axios, { CancelToken } from 'axios';
import { Movie } from '../../extras/types';
import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { modifySearchURL, modifyCurrentPage, modifyResults, modifyTotalPages, modifyLoading, modifyFavoriteMovies, modifyFavoritePeople, modifyFavoriteCompanies, modifyFavoriteCollections } from '../../actions';
import loadingGif from '../../img/loadingGif.gif';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
import noResults from '../../img/noResults.svg';
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import CardPerson from '../CardPerson/CardPerson'
import CardCompany from '../CardCompany/CardCompany';
import CardCollection from '../CardCollection/CardCollection';
import { useHistory } from 'react-router-dom';

export default function Favorite({ type }: FavoriteProps) {

    const results = useSelector((state: { results: null | Movie[] }) => state.results)
    const loading = useSelector((state: { loading: boolean }) => state.loading)
    const favoriteMovies = useSelector((state: { favoriteMovies: boolean }) => state.favoriteMovies)
    const favoritePeople = useSelector((state: { favoritePeople: boolean }) => state.favoritePeople)
    const favoriteCompanies = useSelector((state: { favoriteCompanies: boolean }) => state.favoriteCompanies)
    const favoriteCollections = useSelector((state: { favoriteCollections: boolean }) => state.favoriteCollections)
    const currentPage = useSelector((state: { currentPage: number }) => state.currentPage)

    const dispatch = useDispatch();
    const history = useHistory();
    const radios = [
        { name: 'Movies', nameSingular: 'movie', value: '1' },
        { name: 'People', nameSingular: 'person', value: '2' },
        { name: 'Companies', nameSingular: 'company', value: '3' },
        { name: 'Collections', nameSingular: 'collection', value: '4' },
    ];
    const [radioValue, setRadioValue] = useState(type ? radios.filter(e => e.name.toLowerCase() === type)[0].value : '1');
    const [globalLoading, setGlobalLoading] = useState(false)
    useEffect(() => {
        setRadioValue(type ? radios.filter(e => e.name.toLowerCase() === type)[0].value : '1');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type])

    async function getFavorites(cancelToken: CancelToken | null) {
        try {
            dispatch(modifyLoading(true))
            const movies = localStorage.getItem(radioValue === '1' ? "favoriteMovies" : radioValue === '2' ? "favoritePeople" : radioValue === '3' ? "favoriteCompanies" : "favoriteCollections")
            if (movies && JSON.parse(movies).length) {
                let pages = JSON.parse(movies).length / 20
                if (pages % 1 !== 0) pages = parseInt(`${pages}`) + 1
                let usedCurrentPage = currentPage
                if (usedCurrentPage > pages) {
                    usedCurrentPage = 1;
                    dispatch(modifyCurrentPage(1));
                }
                dispatch(modifyTotalPages(pages))
                let localMovies: Movie[] = []
                let arrayToWork = JSON.parse(movies).slice((usedCurrentPage === 1 ? 0 : (usedCurrentPage - 1) * 20), (usedCurrentPage === 1 ? 20 : ((usedCurrentPage - 1) * 20) + 20))
                if (!arrayToWork.length) {
                    arrayToWork = JSON.parse(movies).slice((usedCurrentPage === 1 ? 0 : (usedCurrentPage - 2) * 20), (usedCurrentPage === 1 ? 20 : ((usedCurrentPage - 2) * 20) + 20))
                    dispatch(modifyCurrentPage(usedCurrentPage - 1))
                }
                let promises: Promise<{ data: Movie }>[] = []
                arrayToWork.forEach((e: number, index: number, array: Array<number>) => {
                    promises.push(axios.get(`https://api.themoviedb.org/3/${radios.filter(e => e.value === radioValue)[0].nameSingular}/${e}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`, cancelToken ? { cancelToken } : undefined))
                })
                let resolvedPromises: { data: Movie }[] = await Promise.all(promises);
                localMovies = resolvedPromises.map(e => {
                    const movie = e.data
                    return { id: movie.id, poster_path: movie.poster_path, release_date: movie.release_date, title: movie.title, name: movie.name, profile_path: movie.profile_path, known_for_department: movie.known_for_department, logo_path: movie.logo_path, origin_country: movie.origin_country };
                })
                dispatch(modifyResults(localMovies))
            } else {
                dispatch(modifyResults([]))
            }
            dispatch(modifyFavoriteMovies(false))
            dispatch(modifyFavoritePeople(false))
            dispatch(modifyFavoriteCompanies(false))
            dispatch(modifyFavoriteCollections(false))
            dispatch(modifyLoading(false))
        } catch (e) {
            if (e instanceof Error) {
                if (e.message !== "Unmounted") return;
            }
        }
    }

    useEffect(() => {
        if (favoriteMovies || favoritePeople || favoriteCompanies || favoriteCollections) getFavorites(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favoriteMovies, favoritePeople, favoriteCompanies, favoriteCollections])

    useEffect(() => {
        document.title = `${radioValue === '1' ? 'Favorite movies' : radioValue === '2' ? 'Favorite people' : radioValue === '3' ? 'Favorite companies' : 'Favorite collections'}`
        getFavorites(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [radioValue])

    useEffect(() => {
        document.title = 'Favorite movies'
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        async function firstLoad() {
            setGlobalLoading(true);
            await getFavorites(source.token);
            setGlobalLoading(false);
        }
        firstLoad();
        return () => {
            source.cancel("Unmounted");
            dispatch(modifySearchURL(''))
            dispatch(modifyCurrentPage(1))
            dispatch(modifyResults(null))
            dispatch(modifyTotalPages(1))
            dispatch(modifyLoading(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    return (
        <>
            {
                !globalLoading ?
                    <div className={s.container}>
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
                                    onChange={(e) => {
                                        history.push(`/favorites/${radio.name.toLowerCase()}`); setRadioValue(radio.value); dispatch(modifySearchURL('')); dispatch(modifyCurrentPage(1));
                                        dispatch(modifyTotalPages(1)); dispatch(modifyLoading(false));
                                    }}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                        <h1 className='w-100 text-center'>Your favorite {radios.filter(e => e.value === radioValue)[0].name.toLowerCase()}</h1>
                        <div className={s.resultsPagination}>
                            {
                                results && results.length ?
                                    <>
                                        {
                                            !loading ?
                                                <div className={s.cardsContainerFull}>
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
                                                </div>
                                                :
                                                <div className={s.loadingContainer}>
                                                    <img className='loading' src={loadingGif} alt='loadingGif'></img>
                                                </div>
                                        }
                                        <PaginationComponent origin={`favorite${radios.filter(e => e.value === radioValue)[0].name}`} />
                                    </>
                                    :
                                    <div className={s.noResultsContainer}>
                                        <div>
                                            <img className={s.noResults} src={noResults} alt='noResults'></img>
                                            <p className='bold mb-0 text-center'>You have not liked any {radios.filter(e => e.value === radioValue)[0].nameSingular} yet</p>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                    :
                    <div className='contentCenter'>
                        <img className='loading' src={loadingGif} alt='loadingGif'></img>
                    </div>
            }
        </>

    );
}
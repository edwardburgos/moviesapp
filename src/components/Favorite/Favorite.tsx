import { CardProps } from '../../extras/types';
import s from './Favorite.module.css'
import defaultPoster from '../../img/icons/alert-circle-outline.svg';
import { Link } from 'react-router-dom';
import { months } from '../../extras/globalVariables';
import { useDispatch, useSelector } from 'react-redux';
import axios, { CancelToken } from 'axios';
import { Movie } from '../../extras/types';
import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { modifySearchURL, modifyCurrentPage, modifyResults, modifyTotalPages, modifyLoading, modifyFavoriteMovies } from '../../actions';
import loadingGif from '../../img/loadingGif.gif';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
import noResults from '../../img/noResults.svg';
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import CardPerson from '../CardPerson/CardPerson'
import CardCompany from '../CardCompany/CardCompany';
import CardCollection from '../CardCollection/CardCollection';


export default function Favorite() {

    const results = useSelector((state: { results: null | Movie[] }) => state.results)
    const loading = useSelector((state: { loading: boolean }) => state.loading)
    const favorites = useSelector((state: { favorites: boolean }) => state.favorites)


    const dispatch = useDispatch();

    const [initialLoading, setInitialLoading] = useState(false)
    const [radioValue, setRadioValue] = useState('1');
    const radios = [
        { name: 'Movies', nameSingular: 'movie', value: '1' },
        { name: 'People', nameSingular: 'person', value: '2' },
        { name: 'Companies', nameSingular: 'company', value: '3' },
        { name: 'Collections', nameSingular: 'collection', value: '4' },
    ];

    async function getFavorites(cancelToken: CancelToken) {
        try {
            setInitialLoading(true)
            const movies = localStorage.getItem(radioValue === '1' ? "favoriteMovies" : radioValue === '2' ? "favoritePeople" : radioValue === '3' ? "favoriteCompanies" : "favoriteCollections")
            if (movies) {
                let localMovies: Movie[] = []
                // const localItems = JSON.parse(localStorage.getItem("favoriteMovies") || '[]')
                for (const e of JSON.parse(movies).slice(0, 20)) {
                    const movieInfo = await axios.get(`https://api.themoviedb.org/3/${radios.filter(e => e.value === radioValue)[0].nameSingular}/${e}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`, { cancelToken })
                    const movie = movieInfo.data
                    localMovies = [...localMovies, { id: movie.id, poster_path: movie.poster_path, release_date: movie.release_date, title: movie.title, name: movie.name, profile_path: movie.profile_path, known_for_department: movie.know_for_department, logo_path: movie.logo_path, origin_country: movie.origin_country }];
                }
                dispatch(modifyResults(localMovies))
                let pages = JSON.parse(movies).length / 20
                if (pages % 1 != 0) pages = parseInt(`${pages}`) + 1
                dispatch(modifyTotalPages(pages))
            } else {
                dispatch(modifyResults([]))
            }
            dispatch(modifyFavoriteMovies(false))
            setInitialLoading(false)
        } catch (e) {
            if (e instanceof Error) {
                if (e.message !== "Unmounted") return;
            }
        }
    }


    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        if (favorites) getFavorites(source.token)
    }, [favorites])

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        getFavorites(source.token)
    }, [radioValue])

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        getFavorites(source.token);
        return () => {
            source.cancel("Unmounted");
            dispatch(modifySearchURL(''))
            dispatch(modifyCurrentPage(1))
            dispatch(modifyResults(null))
            dispatch(modifyTotalPages(1))
            dispatch(modifyLoading(false))
        }
    }, [dispatch])

    return (
        <>
            {
                !initialLoading ?
                    <>
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
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                        <h1 className='w-100 text-center'>Your favorite {radios.filter(e => e.value === radioValue)[0].name.toLowerCase()}</h1>
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
                                                    <p className='bold mb-0 text-center'>You have not liked any {radios.filter(e => e.value === radioValue)[0].nameSingular} yet</p>
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
                            {results && results.length ? <PaginationComponent origin='favorite' /> : null}
                        </div>
                    </>

                    // {!loading ?
                    //     <>
                    //         {
                    //             results && results.length ?
                    //                 results.map((e, index) => <Card key={index} movie={e}></Card>)
                    //                 :
                    //                 null
                    //         }
                    //     </>
                    //     :
                    //     <div className='contentCenter'>
                    //         <img className='loading' src={loadingGif} alt='loadingGif'></img>
                    //     </div>
                    // }
                    // <PaginationComponent origin='favorite' />
                    :
                    <div className='contentCenter'>
                        <img className='loading' src={loadingGif} alt='loadingGif'></img>
                    </div>
            }
        </>
    );
}
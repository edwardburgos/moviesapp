import { CardProps, FavoriteProps } from '../../extras/types';
import s from './Favorite.module.css'
import defaultPoster from '../../img/icons/alert-circle-outline.svg';
import { Link } from 'react-router-dom';
import { months } from '../../extras/globalVariables';
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
import { useHistory } from 'react-router';


export default function Favorite({type}: FavoriteProps) {

    const results = useSelector((state: { results: null | Movie[] }) => state.results)
    const loading = useSelector((state: { loading: boolean }) => state.loading)
    const favoriteMovies = useSelector((state: {favoriteMovies: boolean}) => state.favoriteMovies)
    const favoritePeople = useSelector((state: {favoritePeople: boolean}) => state.favoritePeople)
    const favoriteCompanies = useSelector((state: {favoriteCompanies: boolean}) => state.favoriteCompanies)
    const favoriteCollections = useSelector((state: {favoriteCollections: boolean}) => state.favoriteCollections)
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
    
    useEffect(() => {
        setRadioValue(type ? radios.filter(e => e.name.toLowerCase() === type)[0].value : '1');
        
    }, [type])
    
    async function getFavorites(cancelToken: CancelToken | null) {
        try {
            dispatch(modifyLoading(true))
            const movies = localStorage.getItem(radioValue === '1' ? "favoriteMovies" : radioValue === '2' ? "favoritePeople" : radioValue === '3' ? "favoriteCompanies" : "favoriteCollections")
            if (movies) {
                let localMovies: Movie[] = []
                await new Promise((resolve, reject) => {
                    JSON.parse(movies).slice((currentPage === 1 ? 0 : (currentPage - 1) * 20), (currentPage === 1 ? 20 : ((currentPage - 1) * 20) + 20)).forEach(async (e: number, index: number, array: Array<number>) => {
                        const movieInfo = await axios.get(`https://api.themoviedb.org/3/${radios.filter(e => e.value === radioValue)[0].nameSingular}/${e}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`, cancelToken ? { cancelToken } : undefined)
                        const movie = movieInfo.data
                        localMovies[index] = ({ id: movie.id, poster_path: movie.poster_path, release_date: movie.release_date, title: movie.title, name: movie.name, profile_path: movie.profile_path, known_for_department: movie.know_for_department, logo_path: movie.logo_path, origin_country: movie.origin_country });
                        if (index === array.length - 1) resolve('Completed');
                    })
                })
                dispatch(modifyResults(localMovies))
                let pages = JSON.parse(movies).length / 20
                if (pages % 1 != 0) pages = parseInt(`${pages}`) + 1
                dispatch(modifyTotalPages(pages))
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
    }, [favoriteMovies, favoritePeople, favoriteCompanies, favoriteCollections])

    useEffect(() => {
        document.title = `${radioValue === '1' ? 'Favorite movies' : radioValue === '2' ? 'Favorite people' : radioValue === '3' ? 'Favorite companies' : 'Favorite collections'}`
        getFavorites(null)
    }, [radioValue])

    useEffect(() => {
        document.title = 'Favorite movies'
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
                        onChange={(e) => {history.push(`/favorites/${radio.name.toLowerCase()}`); setRadioValue(e.currentTarget.value)}}
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
                {results && results.length ? <PaginationComponent origin={`favorite${radios.filter(e => e.value === radioValue)[0].name}`} /> : null}
            </div>
        </div>

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
    );
}
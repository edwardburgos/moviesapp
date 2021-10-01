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
import { modifySearchURL, modifyCurrentPage, modifyResults, modifyTotalPages, modifyLoading, modifyFavorites } from '../../actions';
import loadingGif from '../../img/loadingGif.gif';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
import noResults from '../../img/noResults.svg';



export default function Favorite() {

    const results = useSelector((state: { results: null | Movie[] }) => state.results)
    const loading = useSelector((state: { loading: boolean }) => state.loading)
    const favorites = useSelector((state: { favorites: boolean }) => state.favorites)


    const dispatch = useDispatch();

    const [initialLoading, setInitialLoading] = useState(false)

    async function getFavoriteMovies(cancelToken: CancelToken) {
        try {
            setInitialLoading(true)
            const movies = localStorage.getItem("favoriteMovies")
            if (movies) {
                let localMovies: Movie[] = []
                // const localItems = JSON.parse(localStorage.getItem("favoriteMovies") || '[]')
                for (const e of JSON.parse(movies).slice(0, 20)) {
                    const movieInfo = await axios.get(`https://api.themoviedb.org/3/movie/${e}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`, { cancelToken })
                    const movie = movieInfo.data
                    localMovies = [...localMovies, { id: movie.id, poster_path: movie.poster_path, release_date: movie.release_date, title: movie.title, name: null, profile_path: null, known_for_department: null, logo_path: null, origin_country: null }];
                }
                dispatch(modifyResults(localMovies))
                let pages = JSON.parse(movies).length / 20
                if (pages % 1 != 0) pages = parseInt(`${pages}`) + 1
                dispatch(modifyTotalPages(pages))
            } else {
                dispatch(modifyResults([]))
            }
            dispatch(modifyFavorites(false))
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
        if (favorites) getFavoriteMovies(source.token)
    }, [favorites])

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        getFavoriteMovies(source.token);
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
                        <h1 className='w-100 text-center'>Your favorite movies</h1>
                        <div className={results ? s.resultsPagination : s.noResultsPagination}>
                            {results ?
                                !loading ?
                                    <div className={s.cardsContainerFull}>
                                        {results.length ?
                                            <>{results.map((e, index) => <Card key={index} movie={e}></Card>)}</>
                                            :
                                            <div className={s.noResultsContainer}>
                                                <div>
                                                    <img className={s.noResults} src={noResults} alt='noResults'></img>
                                                    <p className='bold mb-0 text-center'>You have not liked any movie yet</p>
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
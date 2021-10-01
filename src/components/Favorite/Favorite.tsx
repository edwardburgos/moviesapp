import { CardProps } from '../../extras/types';
import s from './Favorite.module.css'
import defaultPoster from '../../img/icons/alert-circle-outline.svg';
import { Link } from 'react-router-dom';
import { months } from '../../extras/globalVariables';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Movie } from '../../extras/types';
import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { modifySearchURL, modifyCurrentPage, modifyResults, modifyTotalPages, modifyLoading } from '../../actions';

export default function Favorite() {

    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])
    const dispatch = useDispatch();

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        async function getFavoriteMovies() {
            try {
                // if (localStorage.getItem("favoriteMovies")) {
                //     let localChoosenCities: Movies[] = []
                //     const localItems = JSON.parse(localStorage.getItem("choosenCities") || '[]')
                //     for (const e of localItems) {
                //         const weatherInfo = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${e[0]},${e[1]},${e[2]}&appid=${process.env.REACT_APP_API_KEY}`)
                //         const stateCountryName = await axios.get(`https://edwardweatherapp.herokuapp.com/stateCountryName?countryCode=${e[2]}&stateCode=${e[1]}`)
                //         const { weather, main, wind } = weatherInfo.data
                //         localChoosenCities = [...localChoosenCities, { name: e[0], country: stateCountryName.data.countryName, flag: images[`${e[2].toLowerCase()}.svg`].default, weather: weather[0].description.slice(0, 1).toUpperCase() + weather[0].description.slice(1).toLowerCase(), weatherIcon: `http://openweathermap.org/img/w/${weather[0].icon}.png`, temperature: main.temp, windSpeed: wind.speed, state: stateCountryName.data.stateName }];
                //     }
                //     dispatch(modifyChoosenCities(localChoosenCities))
                // }

                // // Get countries
                // const countries = await axios.get('https://edwardweatherapp.herokuapp.com/countries', { cancelToken: source.token })
                // dispatch(setCountries(countries.data))

                // // The loading state change
                // setLoading(false)
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message !== "Unmounted") return;
                }
            }
        }
        getFavoriteMovies();
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
            <h1>Your favorite movies</h1>
            {
                favoriteMovies.length ?
                    favoriteMovies.map((e, index) => <Card key={index} movie={e}></Card>)
                    :
                    null
            }
        </>
    );
}
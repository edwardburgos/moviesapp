import axios from "axios"
import loadingGif from '../../img/loadingGif.gif';
import { useEffect, useState } from "react"
import { CollectionType, SearchProps } from "../../extras/types"
import Card from "../Card/Card";
import { showMessage } from "../../extras/functions";
import { useDispatch } from 'react-redux'
import { modifyFavoriteCollections } from "../../actions";
import s from './Collection.module.css'
import heart from '../../img/icons/heart.svg'
import heartOutline from '../../img/icons/heart-outline.svg'

export default function Collection({ id }: SearchProps) {

    const [collection, setCollection] = useState<CollectionType>({ id: 0, name: "", overview: "", parts: [] })
    const [loading, setLoading] = useState(false)

    const [selected, setSelected] = useState(false)

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        async function getCollection() {
            try {
                setLoading(true)
                const collection = await axios.get(`https://api.themoviedb.org/3/collection/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                document.title = `${collection.data.name} Collection`
                setCollection(collection.data)
                setLoading(false)
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message === "Unmounted") return "Unmounted";
                }
                showMessage('Sorry, an error ocurred')
            }
        }
        getCollection();
        const favoriteMovies = localStorage.getItem('favoriteCollections')
        if (favoriteMovies) {
            if (JSON.parse(favoriteMovies).includes(id)) setSelected(true)
        }
        return () => { source.cancel("Unmounted"); }
    }, [id])

    const dispatch = useDispatch()
    function addToFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoriteCollections')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies)
            if (!array.filter((e: number) => e === id).length) {
                array.unshift(id)
                localStorage.setItem('favoriteCollections', JSON.stringify(array))
            }
        } else {
            localStorage.setItem('favoriteCollections', JSON.stringify([id]))
        }
        setSelected(true)
    }

    function deleteFromFavoriteMovies() {
        const favoriteMovies = localStorage.getItem('favoriteCollections')
        if (favoriteMovies) {
            const array = JSON.parse(favoriteMovies).filter((e: number) => e !== id)
            localStorage.setItem('favoriteCollections', JSON.stringify(array))
        }
        setSelected(false)
        dispatch(modifyFavoriteCollections(true))
    }
    return (
        <>
            {!loading ?
                <div className='flexCentered'>
                    <div className={s.nameContainer}>
                        <h1 className='w-100 text-center'>{collection.name}</h1>
                        <div className={s.heartIconContainer} onClick={() => selected ? deleteFromFavoriteMovies() : addToFavoriteMovies()}>
                                <img src={heart} className={selected ? s.redHeart : s.heartIcon} alt={'Add to favorite movies'} />
                                <img src={heartOutline} className={s.heartBorder} alt={'Add to favorite movies'} />
                        </div>
                    </div>
                    {collection.overview ? <p className='text-center'>{collection.overview}</p> : null}
                    <h2 className='w-100 mb-3 text-center'>Movies</h2>
                    <div className='cardsContainer'>
                        {collection.parts.map((e, index) => <Card key={index} movie={e}></Card>)}
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
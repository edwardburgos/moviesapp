import axios from "axios"
import s from './Collection.module.css'
import loadingGif from '../../img/loadingGif.gif';
import { useEffect, useState } from "react"
import { CollectionType, SearchProps } from "../../extras/types"
import { months } from '../../extras/globalVariables';
import Card from "../Card/Card";


export default function Collection({ id }: SearchProps) {

    const [collection, setCollection] = useState<CollectionType>({ id: 0, name: "", overview: "", parts: [] })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        async function getCollection() {
            try {
                setLoading(true)
                const collection = await axios.get(`https://api.themoviedb.org/3/collection/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                setCollection(collection.data)
                setLoading(false)
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message === "Unmounted") return "Unmounted";
                }
            }
        }
        getCollection();
        return () => { source.cancel("Unmounted"); }

    }, [])

    return (
        <>
            {!loading ?
                <div className={s.container}>
                    <h1 className='w-100 text-center'>{collection.name}</h1>
                    <p className='text-center'>{collection.overview}</p>
                    <div className={s.cardsContainer}>
                        {collection.parts.map((e, index) => <Card key={index} movie={e}></Card>)}
                    </div>
                </div>

                :
                <div className={s.contentCenter}>
                    <img className={s.loading} src={loadingGif} alt='loadingGif'></img>
                </div>
            }
        </>
    )
}
import { SearchProps, PersonType, Movie } from "../../extras/types"
import axios from "axios"
import { useState, useEffect } from "react"
import s from "./Person.module.css"
import Card from "../Card/Card"
import loadingGif from '../../img/loadingGif.gif';
import defaultProfile from '../../img/icons/person-outline.svg';
import { Carousel } from 'react-bootstrap'
import { showMessage } from "../../extras/functions"

export default function Person({ id }: SearchProps) {

    const [person, setPerson] = useState<PersonType>({
        id: 0, biography: "", birthday: "", deathday: "",
        gender: 0, name: "", place_of_birth: "", profile_path: ""
    })
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [photos, setPhotos] = useState<string[]>([])

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        async function getCollection() {
            try {
                setLoading(true)
                const person = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                setPerson(person.data)
                const movies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&with_cast=${id}`);
                setMovies(movies.data.results)
                const photos = await axios.get(`https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`)
                setPhotos(photos.data.profiles.map((e: { file_path: string }) => e.file_path).filter((e: string) => e))
                setLoading(false)
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message === "Unmounted") return "Unmounted";
                }
                showMessage('Sorry, an error ocurred')
            }
        }
        getCollection();
        return () => { source.cancel("Unmounted"); }
    }, [id])

    return (
        <>
            {!loading ?
                <div className={s.container}>
                    <div className={s.left}>
                        {photos.length > 1 ?
                            <Carousel className={s.profilePic}>
                                {
                                    photos.map((e, index) =>
                                        <Carousel.Item key={index}>
                                            <img
                                                className={s.profilePic}
                                                src={`https://image.tmdb.org/t/p/w500${e}`}
                                                alt={`Slide number ${index}`}
                                            />
                                        </Carousel.Item>
                                    )
                                }
                            </Carousel>
                            :
                            <img className={person.profile_path ? s.profilePic : s.defaultProfilePic} src={person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : defaultProfile} alt={person.name}></img>
                        }
                    </div>
                    <div className={s.right}>
                        <div>
                            <h1 className='w-100 text-center'>{person.name}</h1>
                            {person.birthday ? <><span className='w-100 bold'>Birthday</span><p>{person.birthday}</p></> : null}
                            {person.deathday ? <><span className='w-100 bold'>Deathday</span><p>{person.deathday}</p></> : null}
                            {person.place_of_birth ? <><span className='w-100 bold'>Place of birth</span><p>{person.place_of_birth}</p></> : null}
                            {person.biography ? <><span className='w-100 bold'>Biography</span><p>{person.biography}</p></> : null}
                            {person.gender ? <><span className='w-100 bold'>Gender</span>{person.gender === 1 ? <p>Female</p> : person.gender === 2 ? <p>Male</p> : person.gender === 3 ? <p>Non-binary</p> : null}</> : null}
                        </div>
                    </div>
                    <div className='cardsContainerMargin'>
                        <h2 className='w-100 mb-3 text-center'>Movies</h2>
                        {movies.map((e, index) => <Card key={index} movie={e}></Card>)}
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
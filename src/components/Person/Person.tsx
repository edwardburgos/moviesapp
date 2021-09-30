import { SearchProps, PersonType, Movie } from "../../extras/types"
import axios from "axios"
import { useState, useEffect } from "react"
import s from "./Person.module.css"
import Card from "../Card/Card"
import loadingGif from '../../img/loadingGif.gif';
import defaultProfile from '../../img/icons/person-outline.svg';
import { Carousel } from 'react-bootstrap'
import { showMessage } from "../../extras/functions"
import { Form } from 'react-bootstrap';
import closeCircle from '../../img/icons/close-circle-outline.svg';
import { sortingOptions } from "../../extras/globalVariables"



export default function Person({ id }: SearchProps) {

    const [person, setPerson] = useState<PersonType>({
        id: 0, biography: "", birthday: "", deathday: "", known_for_department: "",
        gender: 0, name: "", place_of_birth: "", profile_path: ""
    })
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [photos, setPhotos] = useState<string[]>([])
    const [sorting, setSorting] = useState('popularity.desc')


    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        async function getCollection() {
            try {
                setLoading(true)
                const person = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                setPerson(person.data)
                document.title = `${person.data.name}`
                const movies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&with_people=${id}`);
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

    async function sortBy(sortParameter: string) {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=${sortParameter}&page=1&with_people=${id}`
        const results = await axios.get(url)
        setMovies(results.data.results)
    }

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
                            {person.known_for_department ? <><span className='w-100 bold'>Known for department</span><p>{person.known_for_department}</p></> : null}
                            {person.birthday ? <><span className='w-100 bold'>Birthday</span><p>{person.birthday}</p></> : null}
                            {person.deathday ? <><span className='w-100 bold'>Deathday</span><p>{person.deathday}</p></> : null}
                            {person.place_of_birth ? <><span className='w-100 bold'>Place of birth</span><p>{person.place_of_birth}</p></> : null}
                            {person.biography ? <><span className='w-100 bold'>Biography</span><p>{person.biography}</p></> : null}
                            {person.gender ? <><span className='w-100 bold'>Gender</span>{person.gender === 1 ? <p>Female</p> : person.gender === 2 ? <p>Male</p> : person.gender === 3 ? <p>Non-binary</p> : null}</> : null}
                        </div>
                    </div>
                    <h2 className='w-100 mb-3 text-center'>Movies</h2>
                    <div className={s.selectContainer}>
                        <Form.Select className={s.selectInput} aria-label="Default select example" value={sorting} onChange={(e) => { const target = e.target as HTMLSelectElement; sortBy(target.value); setSorting(target.value) }}>
                        {sortingOptions.map(e => <option value={e.value}>{e.complete}</option> )}
                        </Form.Select>
                        <div className={sorting === 'popularity.desc' ? s.invisible : s.iconContainer}>
                            <img src={closeCircle} className={sorting === 'popularity.desc' ? s.invisible : s.iconDumb} onClick={() => { sortBy('popularity.desc'); setSorting('popularity.desc'); }} alt={'Remove selected sorting'} />
                        </div>
                    </div>
                    <div className='cardsContainerMargin'>
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
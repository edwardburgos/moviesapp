import s from './App.module.css';
import videocam from './img/icons/videocam-outline.svg'
import SearchBar from './components/SearchBar/SeachBar';
import Card from './components/Card/Card'
import { useSelector } from 'react-redux'
import { Movie } from './extras/types'

export default function App() {

  const movies = useSelector((state: { movies: Movie[] }) => state.movies)

  return (
    <div className={s.container}>

      <div className={s.titleContainer}>
        <img src={videocam} className={s.logo} alt={'Movies app'} />
        <h1 className='mb-0'>Movies app</h1>
      </div>

      <SearchBar></SearchBar>

      {
        movies.length ?
        
          <div className={s.cardsContainer}>
            {movies.map((e, index) => <Card key={index} movie={e}></Card>)}
          </div>
          :
          null
      }

    </div>
  );
}

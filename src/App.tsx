import s from './App.module.css';
import videocam from './img/icons/videocam-outline.svg'
import trending from './img/icons/trending-up-outline.svg'
import SearchBar from './components/Search/Search';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Genre from './components/Genre/Genre';
import Collection from './components/Collection/Collection';
import Company from './components/Company/Company';
import Card from './components/Card/Card'
import Person from './components/Person/Person';
import Detail from './components/Detail/Detail';
import Favorite from './components/Favorite/Favorite';
import { Modal, ButtonGroup, ToggleButton } from 'react-bootstrap'
import axios from 'axios';
import { Movie } from './extras/types'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import heart from './img/icons/heart-outline.svg'
import { modifyShowTrendingModal } from './actions'
import loadingGif from './img/loadingGif.gif';

export default function App() {

  const showTrendingModal = useSelector((state: { showTrendingModal: boolean }) => state.showTrendingModal)

  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [selected, setSelected] = useState<'daily' | 'weekly'>('daily')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  async function getTrendingMovies(frequency: string) {
    setLoading(true)
    const movies = await axios.get(`https://api.themoviedb.org/3/trending/movie/${frequency}?api_key=${process.env.REACT_APP_API_KEY}`)
    setTrendingMovies(movies.data.results)
    setLoading(false)
    if (!showTrendingModal) dispatch(modifyShowTrendingModal(true))
  }

  return (
    <>
      <div className={s.header}>
        <Link to="/favorites/movies"><img src={heart} className={s.heartIcon} alt={'Your favorite movies'} /></Link>
        <Link to="/movies"><img src={videocam} className={s.logo} alt={'Movies app'} /></Link>
        <div onClick={() => getTrendingMovies('day')}><img src={trending} className={s.trendingIcon} alt={'Trending movies'} /></div>
      </div>
      <div className={s.container}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/movies" />
          </Route>
          <Route path="/favorites/:type" render={({ match }) => <Favorite type={match.params.type} />} />
          <Route path="/detail/:id/:name" render={({ match }) => <Detail id={parseInt(match.params.id)} />} />
          <Route path="/genre/:id/:name" render={({ match }) => <Genre id={parseInt(match.params.id)} />} />
          <Route path="/collection/:id/:name" render={({ match }) => <Collection id={parseInt(match.params.id)} />} />
          <Route path="/company/:id/:name" render={({ match }) => <Company id={parseInt(match.params.id)} />} />
          <Route path="/person/:id/:name" render={({ match }) => <Person id={parseInt(match.params.id)} />} />
          <Route exact path="/:type/:searchedGenre?" render={({ match }) => <SearchBar type={match.params.type} searchedGenre={match.params.searchedGenre} />} />
        </Switch>
      </div>
      <Modal
        show={showTrendingModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
        keyboard={false}
        onHide={() => dispatch(modifyShowTrendingModal(false))}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Trending movies
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={s.modalBody}>
          <ButtonGroup id='trending'>
            <ToggleButton id="daily" type="radio" variant="outline-primary" key="daily" name="trending"
              className='mb-2' value='daily' checked={selected === 'daily'} onChange={() => { setSelected('daily'); getTrendingMovies('day') }}
            > Daily trending </ToggleButton>
            <ToggleButton id="weekly" type="radio" variant="outline-primary" key="weekly" name="trending"
              className='mb-2' value='weekly' checked={selected === 'weekly'} onChange={() => { setSelected('weekly'); getTrendingMovies('week') }}
            > Weekly trending </ToggleButton>
          </ButtonGroup>
          <div className={s.cardsContainer}>
            {loading ?
              <div className={s.modalContentCenter}>
                <img className='loading' src={loadingGif} alt='loadingGif'></img>
              </div>
              :
              trendingMovies.map((e, index) => <Card key={index} movie={e}></Card>)}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

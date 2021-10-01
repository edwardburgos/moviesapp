import s from './App.module.css';
import videocam from './img/icons/videocam-outline.svg'
import trending from './img/icons/trending-up-outline.svg'
import SearchBar from './components/Search/Search';
import { Route, Switch, Link } from 'react-router-dom';
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
import heart from './img/icons/heart-outline.svg'

export default function App() {

  const [dailyTrending, setDailyTrending] = useState<Movie[]>([])
  const [weeklyTrending, setWeeklyTrending] = useState<Movie[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState<'daily' | 'weekly'>('daily')

  async function getTrendingMovies() {
    const daily = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`)
    setDailyTrending(daily.data.results)
    const weekly = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`)
    setWeeklyTrending(weekly.data.results)
    setShowModal(true)
  }

  return (
    <>
      <div className={s.header}>
        <Link to="/favoriteMovies"><img src={heart} className={s.heartIcon} alt={'Your favorite movies'} /></Link>
        <Link to="/"><img src={videocam} className={s.logo} alt={'Movies app'} /></Link>
        <div onClick={() => getTrendingMovies()}><img src={trending} className={s.trendingIcon} alt={'Trending movies'} /></div>
      </div>
      <div className={s.container}>
        <Switch>
          <Route exact path="/" component={SearchBar}/>
          <Route path="/favoriteMovies" component={Favorite}/>
          <Route path="/detail/:id/:name" render={({ match }) => <Detail id={parseInt(match.params.id)} />} />
          <Route path="/genre/:id/:name" render={({ match }) => <Genre id={parseInt(match.params.id)} />} />
          <Route path="/collection/:id/:name" render={({ match }) => <Collection id={parseInt(match.params.id)} />} />
          <Route path="/company/:id/:name" render={({ match }) => <Company id={parseInt(match.params.id)} />} />
          <Route path="/person/:id/:name" render={({ match }) => <Person id={parseInt(match.params.id)} />} />
        </Switch>
      </div>
      <Modal
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
        keyboard={false}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Trending movies
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={s.modalBody}>
          <ButtonGroup id='trending'>
            <ToggleButton id="daily" type="radio" variant="outline-primary" key="daily" name="trending"
              className='mb-2' value='daily' checked={selected === 'daily'} onChange={() => setSelected('daily')}
            > Daily trending </ToggleButton>
            <ToggleButton id="weekly" type="radio" variant="outline-primary" key="weekly" name="trending"
              className='mb-2' value='weekly' checked={selected === 'weekly'} onChange={() => setSelected('weekly')}
            > Weekly trending </ToggleButton>
          </ButtonGroup>
          <div className={s.cardsContainer}>
            {
              selected === 'daily' ?
                dailyTrending.map((e, index) => <Card key={index} movie={e}></Card>)
                :
                weeklyTrending.map((e, index) => <Card key={index} movie={e}></Card>)
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

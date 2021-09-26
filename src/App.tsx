import s from './App.module.css';
import videocam from './img/icons/videocam-outline.svg'
import lens from './img/icons/search-outline.svg'
import SearchBar from './components/Search/Search';
import { Route, Switch, Link } from 'react-router-dom';
import Genre from './components/Genre/Genre';
import Collection from './components/Collection/Collection';
import Company from './components/Company/Company';
import Person from './components/Person/Person';
import Detail from './components/Detail/Detail';


export default function App() {

  return (
    <>
      <div className={s.header}>
        <Link to="/"><img src={videocam} className={s.logo} alt={'Movies app'} /></Link>
        <Link to="/"><img src={lens} className={s.searchIcon} alt={'Movies app'} /></Link>
      </div>
      <div className={s.container}>
        <Switch>
          <Route exact path="/" component={SearchBar}></Route>
          <Route path="/detail/:id/:name" render={({ match }) => <Detail id={parseInt(match.params.id)} />} />
          <Route path="/genre/:id/:name" render={({ match }) => <Genre id={parseInt(match.params.id)} />} />
          <Route path="/collection/:id/:name" render={({ match }) => <Collection id={parseInt(match.params.id)} />} />
          <Route path="/company/:id/:name" render={({ match }) => <Company id={parseInt(match.params.id)} />} />
          <Route path="/person/:id/:name" render={({ match }) => <Person id={parseInt(match.params.id)} />} />
        </Switch>
      </div>
    </>
  );
}

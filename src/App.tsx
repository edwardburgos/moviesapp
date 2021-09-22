import s from './App.module.css';
import videocam from './img/icons/videocam-outline.svg'
import SearchBar from './components/SearchBar/SeachBar'

export default function App() {

  return (
    <div className={s.container}>

      <div className={s.titleContainer}>
        <img src={videocam} className={s.logo} alt={'Movies app'} />
        <h1 className='mb-0'>Movies app</h1>
      </div>

      <SearchBar></SearchBar>
    </div>
  );
}

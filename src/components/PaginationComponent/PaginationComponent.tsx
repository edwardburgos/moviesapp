import s from './PaginationComponent.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { modifyResults, modifyLoading } from '../../actions';
import { Pagination } from 'react-bootstrap';
import first from '../../img/icons/play-back-circle-outline.svg'
import back from '../../img/icons/caret-back-circle-outline.svg'
import next from '../../img/icons/caret-forward-circle-outline.svg'
import last from '../../img/icons/play-forward-circle-outline.svg'
import axios from 'axios';
import { modifyCurrentPage } from '../../actions';
import { PaginationProps, Movie } from '../../extras/types';
import { showMessage } from '../../extras/functions';

export default function PaginationComponent({ origin }: PaginationProps) {

  const totalPages = useSelector((state: { totalPages: number }) => state.totalPages)
  const searchURL = useSelector((state: { searchURL: string }) => state.searchURL)
  const currentPage = useSelector((state: { currentPage: number }) => state.currentPage)

  const dispatch = useDispatch();

  // Functions

  // This function modify the movies state
  async function modifyResult(number: string) {
    try {
      let newResult = []
      dispatch(modifyLoading(true))
      if (['favoriteMovies', 'favoritePeople', 'favoriteCompanies', 'favoriteCollections'].includes(origin)) {
        const movies = localStorage.getItem(origin)
        if (movies && JSON.parse(movies).length) {
          let localMovies: Movie[] = []
          let arrayToWork = JSON.parse(movies).slice((parseInt(number) === 1 ? 0 : (parseInt(number) - 1) * 20), (parseInt(number) === 1 ? 20 : ((parseInt(number) - 1) * 20) + 20))
          let promises: Promise<{ data: Movie }>[] = [];
          arrayToWork.forEach((e: number, index: number, array: Array<number>) => {
            const singular = origin === 'favoriteMovies' ? 'movie' : origin === "favoritePeople" ? 'person' : origin === "favoriteCompanies" ? 'company' : 'collection';
            promises.push(axios.get(`https://api.themoviedb.org/3/${singular}/${e}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`))
          })
          let resolvedPromises: { data: Movie }[] = await Promise.all(promises);
          localMovies = resolvedPromises.map(e => {
            const movie = e.data
            return { id: movie.id, poster_path: movie.poster_path, release_date: movie.release_date, title: movie.title, name: movie.name, profile_path: movie.profile_path, known_for_department: movie.known_for_department, logo_path: movie.logo_path, origin_country: movie.origin_country };
          })
          newResult = localMovies
        }
      } else {
        const movies = await axios.get(`${searchURL}${number}`)
        newResult = movies.data.results
      }
      dispatch(modifyResults(newResult))
      dispatch(modifyLoading(false))
    } catch (e) {
      showMessage('Sorry, an error ocurred')
    }
  }

  // This function load the pagination items
  function pageNumberRender() {
    let items = [];
    for (let i = 1; i < totalPages + 1; i++) {
      items.push(
        <Pagination.Item className={s.item} onClick={e => { const target = e.target as HTMLElement; dispatch(modifyCurrentPage(parseInt(target.innerText))); modifyResult(target.innerText) }} key={i}>
          {i}
        </Pagination.Item>
      );
    }
    let currentClickedPage = (<Pagination.Item active activeLabel="" className={s.activo} onClick={(e) => { const target = e.target as HTMLElement; dispatch(modifyCurrentPage(parseInt(target.innerText))) }}
      key={currentPage}>{currentPage}</Pagination.Item>)

    let pointsStart = <Pagination.Item className={s.item} key='pointsStart'> ... </Pagination.Item>
    let pointsEnd = <Pagination.Item className={s.item} key='pointsEnd'> ... </Pagination.Item>
    return [items[currentPage - 5] ? pointsStart : null, items[currentPage - 4], items[currentPage - 3], items[currentPage - 2], currentClickedPage, items[currentPage],
    items[currentPage + 1], items[currentPage + 2], items[currentPage + 3] ? pointsEnd : null];
  };

  // This function move us to the next page
  function nextPage() {
    const nextPage = currentPage + 1;
    if (!(nextPage > totalPages)) {
      dispatch(modifyCurrentPage(nextPage))
      modifyResult(`${nextPage}`)
    }
  };

  // This function move us to the prev page
  function prevPage() {
    const prevPage = currentPage - 1;
    if (!(prevPage < 1)) {
      dispatch(modifyCurrentPage(prevPage))
      modifyResult(`${prevPage}`)
    }
  }

  return (
    <Pagination className={`${s.pagination}`}>
      {currentPage > 1 ?
        <>
          <Pagination.Item className={s.item} key='first' onClick={e => { dispatch(modifyCurrentPage(1)); modifyResult('1') }}>
            <img src={first} className={s.icon} alt="First" />
          </Pagination.Item>
          <Pagination.Item className={s.item} key='prev' onClick={e => { prevPage() }}>
            <img src={back} className={s.icon} alt="Prev" />
          </Pagination.Item>
        </>
        :
        null
      }
      <>{pageNumberRender()}</>
      <>
        {currentPage !== totalPages ?
          <>
            <Pagination.Item className={s.item} key='next' onClick={e => { nextPage() }}>
              <img src={next} className={s.icon} alt="Next" />
            </Pagination.Item>
            <Pagination.Item className={s.item} key='last'>
              <img src={last} className={s.icon} alt="Last" onClick={e => { dispatch(modifyCurrentPage(totalPages)); modifyResult(`${totalPages}`) }} />
            </Pagination.Item>
          </>
          :
          null
        }
      </>
    </Pagination>
  )
}

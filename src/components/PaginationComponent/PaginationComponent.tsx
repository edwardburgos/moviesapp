import s from './PaginationComponent.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modifyResults, modifyLoading } from '../../actions';
import { Pagination } from 'react-bootstrap';
import first from '../../img/icons/play-back-circle-outline.svg'
import back from '../../img/icons/caret-back-circle-outline.svg'
import next from '../../img/icons/caret-forward-circle-outline.svg'
import last from '../../img/icons/play-forward-circle-outline.svg'
import axios from 'axios';

export default function PaginationComponent() {

  const totalPages = useSelector((state: { totalPages: number }) => state.totalPages)
  const searchURL = useSelector((state: { searchURL: string }) => state.searchURL)

  const [currentClickedNumber, setCurrentClickedNumber] = useState(1)

  const dispatch = useDispatch();

  // Functions

  // This function modify the movies state
  async function modifyResult(number: string) {
    dispatch(modifyLoading(true))
    const newResult = await axios.get(`${searchURL}${number}`)
    dispatch(modifyResults(newResult.data.results))
    dispatch(modifyLoading(false))
  }

  // This function load the pagination items
  function pageNumberRender() {
    let items = [];
    for (let i = 1; i < totalPages + 1; i++) {
      items.push(
        <Pagination.Item className={s.item} onClick={e => { const target = e.target as HTMLElement; setCurrentClickedNumber(parseInt(target.innerText)); modifyResult(target.innerText) }} key={i}>
          {i}
        </Pagination.Item>
      );
    }
    let currentPage = (<Pagination.Item active activeLabel="" className={s.activo} onClick={(e) => { const target = e.target as HTMLElement; setCurrentClickedNumber(parseInt(target.innerText)) }}
      key={currentClickedNumber}>{currentClickedNumber}</Pagination.Item>)

    let pointsStart = <Pagination.Item className={s.item} key='pointsStart'> ... </Pagination.Item>
    let pointsEnd = <Pagination.Item className={s.item} key='pointsEnd'> ... </Pagination.Item>
    return [items[currentClickedNumber - 5] ? pointsStart : null, items[currentClickedNumber - 4], items[currentClickedNumber - 3], items[currentClickedNumber - 2], currentPage, items[currentClickedNumber],
    items[currentClickedNumber + 1], items[currentClickedNumber + 2], items[currentClickedNumber + 3] ? pointsEnd : null];
  };

  // This function move us to the next page
  function nextPage() {
    const nextPage = currentClickedNumber + 1;
    if (!(nextPage > totalPages)) {
      setCurrentClickedNumber(nextPage)
      modifyResult(`${nextPage}`)
    }
  };

  // This function move us to the prev page
  function prevPage() {
    const prevPage = currentClickedNumber - 1;
    if (!(prevPage < 1)) {
      setCurrentClickedNumber(prevPage)
      modifyResult(`${prevPage}`)
    }
  }

  return (
    <Pagination className={`${s.pagination} mb-0`}>
      {currentClickedNumber > 1 ?
        <>
          <Pagination.Item className={s.item} key='first' onClick={e => { setCurrentClickedNumber(1); modifyResult('1') }}>
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
        {currentClickedNumber !== totalPages ?
          <>
            <Pagination.Item className={s.item} key='next' onClick={e => { nextPage() }}>
              <img src={next} className={s.icon} alt="Next" />
            </Pagination.Item>
            <Pagination.Item className={s.item} key='last'>
              <img src={last} className={s.icon} alt="Last" onClick={e => { setCurrentClickedNumber(totalPages); modifyResult(`${totalPages}`) }} />
            </Pagination.Item>
          </>
          :
          null
        }
      </>
    </Pagination>
  )
}

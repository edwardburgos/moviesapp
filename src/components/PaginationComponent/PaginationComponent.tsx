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
import { modifyCurrentPage } from '../../actions';

export default function PaginationComponent() {

  const totalPages = useSelector((state: { totalPages: number }) => state.totalPages)
  const searchURL = useSelector((state: { searchURL: string }) => state.searchURL)
  const currentPage = useSelector((state: {currentPage: number}) => state.currentPage)

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

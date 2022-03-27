import React, { useState, useEffect } from 'react'
import './Pagination.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Pagination = ({ query, QUERY_PAGE_RESET }) => {

    const ITEMS_PER_PAGE = 10
    let QUERY_NUM = +query[query.length - 1]

    const { publishedSongsCount } = useSelector(({ song }) => song)

    //If ?page= doesn't exists or is blank, ?page= defaults to 1
    const setDefaultSearchPage = () =>
        QUERY_NUM ? QUERY_NUM : QUERY_NUM = 1

    const [currentPage, setCurrentPage] = useState(setDefaultSearchPage())
    const [hasNextPage, setHasNextPage] = useState(ITEMS_PER_PAGE * QUERY_NUM < publishedSongsCount)
    const [hasPreviousPage, setHasPreviousPage] = useState(QUERY_NUM > 1)
    const lastPage = Math.ceil(publishedSongsCount / ITEMS_PER_PAGE)

    //Update pagination links
    useEffect(() => {
        setCurrentPage(QUERY_NUM)
        setHasNextPage(ITEMS_PER_PAGE * QUERY_NUM < publishedSongsCount)
        setHasPreviousPage(QUERY_NUM > 1)
    }, [QUERY_NUM, publishedSongsCount])

    return (
        <div className='search-menu-pagination'>
            <Link className='search-menu-pagination-btn-arrow' to={QUERY_PAGE_RESET} >{'<'}</Link>

            {hasPreviousPage && <Link className='search-menu-pagination-btn' to={`?page=${currentPage - 1}`} >{currentPage - 1}</Link>}
            <Link className='search-menu-pagination-btn active' to={`?page=${currentPage}`} >{currentPage || 1}</Link>
            {hasNextPage && <Link className='search-menu-pagination-btn' to={`?page=${currentPage + 1}`} >{currentPage + 1}</Link>}

            <Link className='search-menu-pagination-btn-arrow' to={`?page=${lastPage}`} >{'>'}</Link>
        </div>
    )
}

export default Pagination
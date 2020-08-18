import React, { useState } from 'react'
import './SearchMenu.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearAll, isFetchingSongs, filterSongs, getViewableSeachSongs } from '../../Redux/Actions/Song'
import Pagination from './Pagination/Pagination'

const SearchMenu = ({ query }) => {

    const dispatch = useDispatch()
    const QUERY_PAGE_RESET = '?page=1'
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const initialState = {
        title: '',
        author: ''
    }
    const [searchParameters, setSearchParameters] = useState(initialState)

    const onClickHome = () => {
        if (!isAuthenticated)
            dispatch(clearAll())
    }

    const onChange = e =>
        setSearchParameters({ ...searchParameters, [e.target.name]: e.target.value })

    const onClickSearch = () => {
        if (searchParameters.title || searchParameters.author) {
            dispatch(isFetchingSongs())
            dispatch(filterSongs(searchParameters))
        }
        else if (!searchParameters.title && !searchParameters.author) return
    }

    const clearFilter = () =>
        dispatch(getViewableSeachSongs(QUERY_PAGE_RESET))

    return (
        <div className='search-menu'>
            <h3 className='search-menu-filter font-4 center'>Filter:</h3>
            <div className='search-menu-container'>
                <input className='search-menu-input' type='text' name='title' placeholder='Filter By Song Name' value={searchParameters.title} onChange={e => onChange(e)} />
                <input className='search-menu-input' type='text' name='author' placeholder='Filter By Author' value={searchParameters.author} onChange={e => onChange(e)} />
            </div>

            <div className='search-menu_btns'>
                <Link to={searchParameters.title || searchParameters.author ? QUERY_PAGE_RESET : query} className='btn search-menu_btn' onClick={() => onClickSearch()}><span role='img' aria-label='Search'>&#x1f50d;</span></Link>
                <Link to={QUERY_PAGE_RESET} className='btn search-menu_btn search-menu_btn-clear' onClick={() => clearFilter()}>Clear</Link>
                <Link to='/' className='btn search-menu_btn search-menu_btn-home' onClick={() => onClickHome()} >Home</Link>
            </div>

            <Pagination query={query} QUERY_PAGE_RESET={QUERY_PAGE_RESET} />
        </div>
    )
}

export default SearchMenu
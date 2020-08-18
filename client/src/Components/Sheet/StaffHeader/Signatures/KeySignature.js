import React, { Fragment, useEffect } from 'react'
import './Signature.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateKeySignature } from '../../../../Redux/Actions/Song'

const KeySignature = () => {

    const dispatch = useDispatch()

    const key = useSelector(state => state.song.keySignature)
    const user = useSelector(state => state.auth.user)
    const currentSong = useSelector(state => state.song.currentSong)

    //Update key-signature
    useEffect(() => {
        if (user._id && currentSong && currentSong.keySignature && (currentSong.keySignature.id !== key.id))
            dispatch(updateKeySignature(currentSong.keySignature))
    }, [dispatch, user._id, key.id, currentSong])

    return (
        <Fragment>
            {(
                (key.id === 2 &&
                    <div className='key-signature'>
                        <span className='sharp1 font-2'>&#9839;</span>
                    </div>) ||
                (key.id === 3 &&
                    <div className='key-signature'>
                        <span className='sharp1 font-2'>&#9839;</span>
                        <span className='sharp2 font-2'>&#9839;</span>
                    </div>) ||
                (key.id === 4 &&
                    <div className='key-signature'>
                        <span className='sharp1 font-2'>&#9839;</span>
                        <span className='sharp2 font-2'>&#9839;</span>
                        <span className='sharp3 font-2'>&#9839;</span>
                    </div>) ||
                (key.id === 5 &&
                    <div className='key-signature'>
                        <span className='sharp1 font-2'>&#9839;</span>
                        <span className='sharp2 font-2'>&#9839;</span>
                        <span className='sharp3 font-2'>&#9839;</span>
                        <span className='sharp4 font-2'>&#9839;</span>
                    </div>) ||
                (key.id === 6 &&
                    <div className='key-signature'>
                        <span className='sharp1 font-2'>&#9839;</span>
                        <span className='sharp2 font-2'>&#9839;</span>
                        <span className='sharp3 font-2'>&#9839;</span>
                        <span className='sharp4 font-2'>&#9839;</span>
                        <span className='sharp5 font-2'>&#9839;</span>
                    </div>) ||
                (key.id === 7 &&
                    <div className='key-signature'>
                        <span className='sharp1 font-2'>&#9839;</span>
                        <span className='sharp2 font-2'>&#9839;</span>
                        <span className='sharp3 font-2'>&#9839;</span>
                        <span className='sharp4 font-2'>&#9839;</span>
                        <span className='sharp5 font-2'>&#9839;</span>
                        <span className='sharp6 font-2'>&#9839;</span>
                    </div>) ||
                (key.id === -5 &&
                    <div className='key-signature'>
                        <span className='flat1 font-3'>&#9837;</span>
                        <span className='flat2 font-3'>&#9837;</span>
                        <span className='flat3 font-3'>&#9837;</span>
                        <span className='flat4 font-3'>&#9837;</span>
                        <span className='flat5 font-3'>&#9837;</span>
                    </div>) ||
                (key.id === -4 &&
                    <div className='key-signature'>
                        <span className='flat1 font-3'>&#9837;</span>
                        <span className='flat2 font-3'>&#9837;</span>
                        <span className='flat3 font-3'>&#9837;</span>
                        <span className='flat4 font-3'>&#9837;</span>
                    </div>) ||
                (key.id === -3 &&
                    <div className='key-signature'>
                        <span className='flat1 font-3'>&#9837;</span>
                        <span className='flat2 font-3'>&#9837;</span>
                        <span className='flat3 font-3'>&#9837;</span>
                    </div>) ||
                (key.id === -2 &&
                    <div className='key-signature'>
                        <span className='flat1 font-3'>&#9837;</span>
                        <span className='flat2 font-3'>&#9837;</span>
                    </div>) ||
                (key.id === -1 &&
                    <div className='key-signature'>
                        <span className='flat1 font-3'>&#9837;</span>
                    </div>))}
        </Fragment>
    )
}

export default KeySignature
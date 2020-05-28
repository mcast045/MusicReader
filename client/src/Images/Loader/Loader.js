import React from 'react';
import GIF from './loader.gif'
import './Loader.css'

const Loader = () => {
    return (
        <div className='loader-container'>
            <img src={GIF} alt='Loading...' className='loader' />
        </div>
    );
}

export default Loader;
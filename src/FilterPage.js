import React, { useState, useEffect } from 'react';
import './FilterPage.css';
import { pageState } from './pageState';
import config from './config';

function FilterPage({ togglePage }) {
    return(
        <div className='FilterPage'>
            <div id="filter-page-toolbar">
                <button id="filter-page-filter-button">фильтр</button>
                <input id="filter-page-search" placeholder='найти...'></input>
            </div>
        </div>
    );
}

export default FilterPage;
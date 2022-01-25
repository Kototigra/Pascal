import React, {useEffect, useState} from 'react';
import {getRests, optionAction, searchAction} from "../../../redux/actions/rests.action";
import {useDispatch, useSelector} from "react-redux";
import classes from './Search.module.css'
import {changeInputAction} from "../../../redux/actions/search.action";


const Search = ({value}) => {
    const input = useSelector(state => state.searchInput)
    // const [searchQuery, setSearchQuery] = useState('')
    const [data, setData] = useState(input)
    const dispatch = useDispatch()



    const inputHandler = (e) => {
        const data = e.target.value
        setData(data)
        dispatch(changeInputAction(data))
        dispatch(searchAction(data))
    }

    return (
        <>
            <input type="text"
                   className={classes["search"]}
                   placeholder="Type here..."
                   // value={searchQuery} for saga use
            onChange={inputHandler}
            />
        </>
    );
};

export default Search;

import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Selector from "../Selector/Selector";
import Search from "../Search/Search";
import classes from './NavBar.module.css'
import id from './NavBar.module.css'
import OneRest from "../../common/OneRest/OneRest";
import {useDispatch, useSelector} from "react-redux";
import {getWords} from "../../../redux/actions/action";

const NavBar = () => {

    const dispatch = useDispatch()
    const [rests, setRests] = useState()

    const [options, setOptions] = useState('')


    const [searchQuery, setSearchQuery] = useState('')

    const filterRests = (value) => {
        console.log(value)
        setOptions(value)
        // setSelectedSort(value)
        // setSearchQuery('')
        // console.log({searchQuery,selectedSort})
    //      setRests([...rests].filter(el => {
    //        return  el.location = 'Novikov'
    // }))
    }



    return (


        <div className={classes["navbar"]}>
            <Link className={classes["home-link"]} to={'/'}>Pascal</Link>

            <Selector
                value={options}
                onChange={filterRests}
                defaultValue="Cities"
                options={[
                    {value: 'Moscow', name: 'Moscow'},
                    {value: 'Togliatti', name: 'Togliatti'},
                    {value: 'Tver', name: 'Tver'},
                    {value: 'Samara', name: 'Samara'}
                ]}
            />

            <Search
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
            <Link className={classes["other-link"]} to={'/signin'}>Sign in</Link>
            <Link className={classes["other-link"]} to={'/signup'}>Sign up</Link>
            <Link className={classes["other-link"]} to={'/restaurants/1'}>Ресторан 1</Link>


        </div>

    );
};

export default NavBar;

// <button onClick={getAllRests}  ></button>
// <div>
//     {rests && rests.map(rest => <OneRest id={rest.id} title={rest.title} />
//     )}
// </div>

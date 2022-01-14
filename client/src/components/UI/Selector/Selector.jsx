import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {optionAction, searchAction} from "../../../redux/actions/action";

const Selector = ({options, defaultValue, value}) => {
const [city, setCity] = useState('')
const dispatch = useDispatch()

    const onChange = (e) => {
    const data = e.target.value
        setCity(data)
        dispatch(searchAction(e.target.value))

    }

    return (
        <>
            <select value={value}
            onChange={onChange}
            >
                <option selected value={defaultValue}>{defaultValue}</option>
                {options.map(option =>
                <option key={option.value} value={option.value}>{option.name}</option>
                    )}
            </select>
        </>


    );
};

export default Selector;
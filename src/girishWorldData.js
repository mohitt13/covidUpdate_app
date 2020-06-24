import React, {useEffect} from 'react';
// import './App.css';
import * as axios from "axios";
import worldData from "./actions/world_data";
import {useDispatch, useSelector} from "react-redux";
import {Card, CardBody, CardTitle, CardText} from "reactstrap";
// import 'bootstrap/dist/css/bootstrap.css';


function App() {
    let worlddata;
    const dispatch=useDispatch();

    const variable=useSelector(state=>state);
    useEffect(async()=>{
        await axios.get('https://api.covid19api.com/world/total').
        then(res=>worlddata=res.data);

        dispatch(worldData({totalConfirmed:worlddata.TotalConfirmed,totalDeaths:worlddata.TotalDeaths,totalRecovered:worlddata.TotalRecovered}));

    },[]);



    return (
        <div className="App">
            <CardBody>
                <CardTitle>World Data</CardTitle>
                <CardText>TotalCases::{variable.totalConfirmed}</CardText>
                <CardText>TotalDeath::{variable.totalDeaths}</CardText>
                <CardText>TotalRecovered::{variable.totalRecovered}</CardText>
            </CardBody>


        </div>
    );
}

export default App;


//Action//


import React from "react";

const worldData=(props)=>{
    return{
        type:"worldData",
        totalConfirmed:props.totalConfirmed,
        totalDeaths:props.totalDeaths,
        totalRecovered:props.totalRecovered
    };
}

export default worldData;


//Reducer//


import React from "react";

const worldReducer=(state={},action)=>{
    switch (action.type) {
        case 'worldData':{
            return ({
                totalConfirmed:action.totalConfirmed,
                totalDeaths:action.totalDeaths,
                totalRecovered:action.totalRecovered
            });
        }

        default:
            return state;

    }
}



export default worldReducer;
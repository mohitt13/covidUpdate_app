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
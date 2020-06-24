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
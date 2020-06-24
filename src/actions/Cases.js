import React from "react";

const Cases = (props)=> {
    return {
        type: "cases",
        totalCases: props.totalCases,
        recovered: props.recovered,
        deaths:props.deaths,
        countryName:props.countryName
    }
}

export default Cases;
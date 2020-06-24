import React from "react";

const CasesReducer = (state =[],action )=>{
    switch (action.type) {
        case 'cases':
            return(
                {
                    type:'cases',
                    totalCases: action.totalCases,
                    recovered: action.recovered,
                    deaths:action.deaths,
                    countryName:action.countryName
                });

        default:
            return state;

    }
}
export default CasesReducer;
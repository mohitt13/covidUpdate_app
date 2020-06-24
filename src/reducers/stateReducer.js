import React from "react";

const stateReducer = (state =[],action )=>{
    switch (action.type) {
        case 'stateCases':
            return(
                {
                    type:'stateCases',
                    active:action.active,
                    cured:action.cured,
                    death:action.death,
                    stateName:action.stateName
                });

        default:
            return state;

    }
}
export default stateReducer;
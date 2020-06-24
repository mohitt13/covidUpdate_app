import React from "react";

const dropdownReducer = (state =[],action )=>{
    switch (action.type) {
        case 'dropdown':
            return(
                {
                type:'dropdown',
                data:action.data
            });

        default:
            return state;

    }
}
export default dropdownReducer;
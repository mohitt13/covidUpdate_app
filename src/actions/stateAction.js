import React from "react";

const stateAction = (props)=> {
    return {
        type: "stateCases",
        active: props.active,
        cured: props.cured,
        death:props.death,
        stateName:props.stateName
    }
}

export default stateAction;
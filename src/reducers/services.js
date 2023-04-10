import {FETCH_SERVICES} from "types"


function servicesReducer(state = {items: []}, action) {
  switch(action.type){
    case FETCH_SERVICES:
        return {...state, items: action.services}
    default:
        return state
  }
}

export default servicesReducer
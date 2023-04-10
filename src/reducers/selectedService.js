import {FETCH_SERVICE_BY_ID} from "types"


function selectedService(state = { item: {} }, action) {
    switch (action.type) {
        case FETCH_SERVICE_BY_ID:
            return { item: action.services }
        default:
            return state;
    }
}

export default selectedService
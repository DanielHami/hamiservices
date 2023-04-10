import { combineReducers } from "@reduxjs/toolkit";
import { FETCH_OFFERS_SUCCESS, OFFER_STATUS_CHANGE, COLLABORATION_CREATED_FROM_OFFER } from "types";
import { isFetching } from './common'

const createOfferList = offersType => {
    return (state = [], action) => {
        if (action.offersType !== offersType) {
        return state
        }
        switch(action.type) {
            case FETCH_OFFERS_SUCCESS: {
              return action.offers
            }
            case OFFER_STATUS_CHANGE: {
                const nextState = [...state]  
                const offerIndex = nextState.findIndex(offer => offer.id === action.offerId)
                nextState[offerIndex].status = action.status
                return nextState
            }
            case COLLABORATION_CREATED_FROM_OFFER: {
                const nextState = [...state]  
                const offerIndex = nextState.findIndex(offer => offer.id === action.offerId)
                nextState[offerIndex].collaborationCreated = true
                return nextState
            }
            default: 
              return state
        }
    }
}

const offers = combineReducers({
    received: createOfferList('received'),
    sent: createOfferList('sent'),
    isFetching: isFetching('offers')
})

export default offers
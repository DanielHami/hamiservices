
import * as api from 'api'
import { FETCH_OFFERS_SUCCESS,OFFER_STATUS_CHANGE, FETCH_RESOURCE_SUCCESS, REQUEST_RESOURCE } from 'types'

export const createOffer = offer => {
    return api.createOffer(offer)
}

const extractDataFromOffer =  async(offer, userType) => {
    
     const service = await api.fetchById(offer.service)
     const user = await api.getUserProfile(offer[userType])
    
     offer.service = service
     offer[userType] = user
     
     return offer
}

export const fetchSentOffers = userId => dispatch => {
    dispatch({type: REQUEST_RESOURCE, resource: 'offers'})
    return api
           .fetchSentOffers(userId)
           .then(async offers => {
            const mappedOffers = await Promise.all(offers.map(offer => extractDataFromOffer(offer, 'toUser')))
            dispatch({type: FETCH_RESOURCE_SUCCESS, resource: 'offers'})
            dispatch({type: FETCH_OFFERS_SUCCESS, offers: mappedOffers, offersType: 'sent'})
            return mappedOffers
           })
}

export const fetchRecievedOffers = userId => dispatch => {
    dispatch({type: REQUEST_RESOURCE, resource: 'offers'})
    return api
           .fetchRecievedOffers(userId)
           .then(async offers => {
            const mappedOffers = await Promise.all(offers.map(offer => extractDataFromOffer(offer, 'fromUser')))
            dispatch({type: FETCH_RESOURCE_SUCCESS, resource: 'offers'})
            dispatch({type: FETCH_OFFERS_SUCCESS, offers: mappedOffers, offersType: 'received'})
            return mappedOffers
           })
}

export const acceptOffer = offerId => dispatch => {
   api.changeOfferStatus(offerId, 'accepted')
      .then(_ => dispatch({type: OFFER_STATUS_CHANGE, offerId, status: 'accepted', offersType: 'received'}))
}

export const declineOffer = offerId => dispatch => {
    api.changeOfferStatus(offerId, 'decline')
      .then(_ => dispatch({type: OFFER_STATUS_CHANGE, offerId, status: 'decline', offersType: 'received'}))
}
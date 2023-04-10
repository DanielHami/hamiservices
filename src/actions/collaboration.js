import * as api from 'api'
import { COLLABORATION_CREATED_FROM_OFFER, 
         FETCH_USER_MESSAGES_SUCCESS,
         SET_COLLABORATION,
         SET_COLLABORATION_JOINED_PEOPLE, 
         UPDATE_COLLABORATION_USER,
         SET_COLLABORATION_MESSAGES,
         RESET_COLLABORATION_MESSAGES,
         REMOVE_COLLABORATION_MESSAGE} from 'types'

export const collaborate = ({collaboration, message}) => dispatch => 
    api.createCollaboration(collaboration)
       .then(collabId => {
        message.cta = `/collaborations/${collabId}`
        api.sendMessage(message)
        api.markOfferAsInCollab(collaboration.fromOffer)
        dispatch({type: COLLABORATION_CREATED_FROM_OFFER,
                  offerId: collaboration.fromOffer,
                  offersType: 'sent' })
        return collabId
       })


export const subscribeToMessages = userId => dispatch => api.subscribeToMessages(userId, messages => dispatch({type: FETCH_USER_MESSAGES_SUCCESS, messages}))
    
export const markMessageAsRead = message  => api.markMessageAsRead(message)

export const fetchCollaborations = userId => api.fetchCollaborations(userId)

export const subToCollaboration = (collabId, done) => dispatch => 
  api.subToCollaboration(collabId, async collaboration => {
    let joinedPeople = []
    if(collaboration.joinedPeople) {
        joinedPeople = await Promise.all(
            collaboration.joinedPeople.map(async user => {
              const snapshot = api.getUserProfile(user)
              return snapshot
            })
          
        )
    }
    dispatch({type: SET_COLLABORATION, collaboration})
    dispatch({type: SET_COLLABORATION_JOINED_PEOPLE, joinedPeople})
    done({joinedPeople})
  })

  export const joinCollaboration = (collabId, userId) =>
      api.joinCollaboration(collabId, userId)
  export const leaveCollaboration = (collabId, userId) => 
      api.leaveCollaboration(collabId, userId)

  export const subToProfile = uid => dispatch =>
    api.subToProfile(uid, user => 
      dispatch({type: UPDATE_COLLABORATION_USER,user})
    )

  export const sendMessageToUser = message => dispatch => {
    return api
    .sendMessageToUser(message)
    .catch(err => {
      dispatch({type: REMOVE_COLLABORATION_MESSAGE, messageId: message.timestamp})
      return Promise.reject('Collaboration is expired!')
    })
}

  
  export const subToMessages = collabId => dispatch => {
    dispatch({type: RESET_COLLABORATION_MESSAGES})
    return api.subToMessages(collabId, messages => {
      dispatch({type: SET_COLLABORATION_MESSAGES, messages})
    })
  }

  export const startCollaboration = (collabId, expiresAt) => 
    api.startCollaboration(collabId, expiresAt)
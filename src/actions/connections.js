import * as api from 'api'

export const checkUserConnection = uid =>
    api.onConnectionChanged((isConnected) => {
    api.setUserOnlineStatus(uid, isConnected)
  })
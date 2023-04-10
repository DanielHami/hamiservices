import { Timestamp } from "firebase/firestore"

export const newCollaboration = ({offer: {service, time, toUser, id}, fromUser}) => {
    return ({
         serviceId: service.id,
         title: service.title,
         image: service.image,
         time: time * 60 * 60,
         allowedPeople: [fromUser.uid, toUser.uid],
         joinedPeople: [],
         toUser: toUser.uid,
         fromUser: fromUser.uid,
         fromOffer: id,
         status: 'pending',
         createdAt: Timestamp.fromDate(new Date())
    })
}

export const newMessage = ({offer: {service, toUser}, fromUser}) => {
    return ({
        isRead: false,
        type: 'invitation',
        text: `Hello ${toUser.fullname}, please join colleboration as soon as possible`,
        cta: '', //click the action
        toUser: toUser.uid,
        fromUser:{
            name: fromUser.fullname,
            avatar: fromUser.avatar
        },
        serviceTitle: service.title,
        serviceLink: `/services/${service.id}`,
        createdAt: Timestamp.fromDate(new Date())
        
    })
}


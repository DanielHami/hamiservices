import app from 'database'
import { collection, getFirestore } from 'firebase/firestore'
import { doc, setDoc, query, where, getDocs, updateDoc } from "firebase/firestore"; 


const db = getFirestore(app);

export const createOffer = async (offer) => {
    const a = doc(collection(db, "offers"));
    await setDoc(a, offer)
}

export const fetchSentOffers = async(userId) => {
    const q = query(collection(db, "offers"), where('fromUser', '==', userId))
    const snapshot = await getDocs(q);
    const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return services
}

export const fetchRecievedOffers = async(userId) => {
    const q = query(collection(db, "offers"), where('toUser', '==', userId))
    const snapshot = await getDocs(q);
    const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return services
}

export const changeOfferStatus = async(offerId, status) => {
    const offerRef = doc(db, 'offers', offerId )
    await updateDoc(offerRef, {status});
}

export const markOfferAsInCollab = async offerId => {
    const offerRef = doc(db, 'offers', offerId )
    await updateDoc(offerRef, {collaborationCreated: true});
}
import app from 'database'
import { doc, setDoc, addDoc,onSnapshot, updateDoc, query, where, getDocs,collection, getFirestore, arrayUnion, arrayRemove} from "firebase/firestore"; 



const db = getFirestore(app);


export const createCollaboration = async(collab) => {
 const docRef = await addDoc(collection(db, "collaborations"),collab)
   return docRef.id
}

export const sendMessage = async(message) => {
    const docRef = doc(collection(db, `profile/${message.toUser}`, 'messages'))
    await setDoc(docRef, message)
}

export const subscribeToMessages = (userId, callback) => 
    onSnapshot(collection(db, `profile/${userId}/messages`), snapshot => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(messages)
  })

export const markMessageAsRead = async message => {
    const messagesRef = doc(db, `profile/${message.toUser}/messages/${message.id}`)
    await updateDoc(messagesRef, {
      isRead: true
    })
}

export const fetchCollaborations = async userId => {
  const q = query(collection(db, "collaborations"), where('allowedPeople', 'array-contains', userId))
  const snapshot = await getDocs(q)
  const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  return services
}

export const subToCollaboration = (collabId, done) => 
  onSnapshot(doc(db, `collaborations/${collabId}`), snapshot => {
  const collab = { id: snapshot.id, ...snapshot.data() }
  done(collab)
})

export const joinCollaboration = (collabId, uid) => {
  const docRef = doc(db, `collaborations/${collabId}`)
  const update = updateDoc(docRef, {joinedPeople: arrayUnion(uid)})
  return update
}

export const leaveCollaboration = (collabId, uid) => {
  const docRef = doc(db, `collaborations/${collabId}`)
  const update = updateDoc(docRef, {joinedPeople: arrayRemove(uid)})
  return update
}

export const subToProfile = (uid, done) => {
  const profileRef = doc(db, `profiles/${uid}`)
  const snapshots = onSnapshot(profileRef, snapshot => {
  const user = { id: snapshot.id, ...snapshot.data() }
  done(user)
  })
  return snapshots
}

  export const sendMessageToUser = async(message) => {
    await setDoc(doc(db, "collaborations", `${message.collabId}`, "messages", `${message.timestamp}`), message.message);
}

  export const subToMessages = (collabId, done) => {
    const collectionRef = collection(db, `collaborations/${collabId}/messages`)
      const snapshots = onSnapshot(collectionRef, (snapshot) => {
      const changes = snapshot.docChanges();
      done(changes);
    })
    return snapshots
  }

export const startCollaboration = (collabId, expiresAt) => {
  updateDoc(doc(db, `collaborations/${collabId}`), {expiresAt})
}
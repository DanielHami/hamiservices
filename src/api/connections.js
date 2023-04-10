import app from 'database'
import { getFirestore, doc, serverTimestamp, updateDoc  } from 'firebase/firestore'
import { getDatabase, ref, onValue} from "firebase/database";


const db = getFirestore(app);
const database = getDatabase();

const getOnlineStatus = (isOnline) => ({
  state: isOnline ? 'online' : 'offline',
  lastChanged: serverTimestamp(),
});

export const setUserOnlineStatus = async (uid, isOnline) => {
  const userRef = doc(db, "profile", uid);
  const updateData = getOnlineStatus(isOnline);
  await updateDoc(userRef, updateData);
};

export const onConnectionChanged = (onConnection) => {
  const connectedRef = ref(database, ".info/connected");
  onValue(connectedRef, (snapshot) => {
    if (snapshot && snapshot.val()) {
      onConnection(snapshot.val());
    } else {
      onConnection(false);
    }
  });
};







import app from 'database'
import { getFirestore } from 'firebase/firestore'
import {  doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"; 


const db = getFirestore(app);
const auth = getAuth();

const createUserProfile = async(userProfile) => {
    await setDoc(doc(db, "profile", `${userProfile.uid}`),userProfile)
  }

export const register = async ({ email, password, fullname, avatar }) => {
    try{
       const res = await createUserWithEmailAndPassword(auth, email, password)
       const {user} = res
       const userProfile = {uid: user.uid, fullname, email, avatar, services: [], description: ''}
       await createUserProfile(userProfile)
       return userProfile
    }
    catch(error) {
        return Promise.reject(error.message)
    };
  }

export const login = async ({ email, password}) => {
    try {
     await signInWithEmailAndPassword(auth, email, password)
    }
    catch(error) {
      return Promise.reject(error.message)
  };
  }

export const onAuthStateChanged = onAuthCallback => getAuth().onAuthStateChanged(onAuthCallback)

export const logout = async () => {
    await signOut(auth);
   }


export const getUserProfile = async uid => {
    const docRef = doc(db, "profile", `${uid}`)
     const snapshot = await getDoc(docRef);
     const profile = ({ uid, ...snapshot.data() });
     return profile
   }


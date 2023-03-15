// /* eslint-disable prettier/prettier */
// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
// import { useEffect, useState } from 'react';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: 'AIzaSyCANLXrKwfYVV9OTvCvVqgVa6BY8fgISnA',
//     authDomain: 'todo-list-with-user-auth.firebaseapp.com',
//     projectId: 'todo-list-with-user-auth',
//     storageBucket: 'todo-list-with-user-auth.appspot.com',
//     messagingSenderId: '1026718802949',
//     appId: '1:1026718802949:web:6bdf32a87196bdb016e86c',
// };

// // Initialize Firebase
// const auth = getAuth();
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

// // Custom Hook

// export async function upload(file: any, currentUser: any, setLoading: any) {
//     const fileRef = ref(storage, currentUser.uid + '.png');

//     setLoading(true);

//     const snapshot = await uploadBytes(fileRef, file);
//     const photoURL = await getDownloadURL(fileRef);

//     updateProfile(currentUser, { photoURL });

//     setLoading(false);
//     alert('Uploaded file!');
// }

import { useEffect, useState } from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    // createUserWithEmailAndPassword,
    // signInWithEmailAndPassword,
    onAuthStateChanged,
    // signOut,
    updateProfile,
} from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCANLXrKwfYVV9OTvCvVqgVa6BY8fgISnA',
    authDomain: 'todo-list-with-user-auth.firebaseapp.com',
    projectId: 'todo-list-with-user-auth',
    storageBucket: 'todo-list-with-user-auth.appspot.com',
    messagingSenderId: '1026718802949',
    appId: '1:1026718802949:web:6bdf32a87196bdb016e86c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
export const db = getFirestore(app);

// Custom Hook
export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
        return unsub;
    }, []);

    return currentUser;
}

// Storage
export async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid + '.png');

    setLoading(true);

    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser, { photoURL });

    setLoading(false);
    alert('Uploaded file!');
}

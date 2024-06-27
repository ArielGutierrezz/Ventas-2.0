import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyAILOM5bnF17ArJSnqX0ssiNxVnSNbv9Iw",
    authDomain: "venta-vehiculos.firebaseapp.com",
    projectId: "venta-vehiculos",
    storageBucket: "venta-vehiculos.appspot.com",
    messagingSenderId: "42424355017",
    appId: "1:42424355017:web:436e256ebcc031bd722518",
    measurementId: "G-DWEQ9EHF91"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const save = (emp) => {
    addDoc(collection(db, 'Vehiculos'), emp)
}

export const getData = (data) => {
    onSnapshot(collection(db, 'Vehiculos'), data)
}

export const remove = (id) =>{
    deleteDoc(doc(db,'Vehiculos',id))
}

export const selectOne = (id) => getDoc(doc(db,'Vehiculos',id))
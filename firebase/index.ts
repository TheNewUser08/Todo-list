import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCWv_nPJ9PA6RZzOT5u3OU1N8Tjful7X4Q',
	authDomain: 'todo-list-e2566.firebaseapp.com',
	projectId: 'todo-list-e2566',
	storageBucket: 'todo-list-e2566.appspot.com',
	messagingSenderId: '31426874126',
	appId: '1:31426874126:web:619dc77efc1f42dbf2a55f',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCucO3k9UU20xQIwCF1fw5w4aNMby_uUt0',
  authDomain: 'catalyst-cae04.firebaseapp.com',
  databaseURL: 'https://catalyst-cae04-default-rtdb.firebaseio.com',
  projectId: 'catalyst-cae04',
  storageBucket: 'catalyst-cae04.appspot.com',
  messagingSenderId: '368195888434',
  appId: '1:368195888434:web:e162139aabfd3a2f9ea32b',
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth(app)

export { app, auth, database }

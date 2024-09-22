
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAqVUZlmQH80liHHfePv9phaimnIBCFPc8",
  authDomain: "bd2front.firebaseapp.com",
  projectId: "bd2front",
  storageBucket: "bd2front.appspot.com",
  messagingSenderId: "136830416333",
  appId: "1:136830416333:web:cd4701c8deb0b7ac528084"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const storage = getStorage(app)

export { auth, app, storage }
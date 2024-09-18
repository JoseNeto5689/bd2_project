
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const storage = getStorage(app)

export { auth, app, storage }
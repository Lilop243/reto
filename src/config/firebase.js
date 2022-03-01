import firebase from "firebase/app";
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey: "AIzaSyAR2Mz1Cy1qvJx7pZggrPLL5igS8l8ynac",
  authDomain: "prueba-4d07d.firebaseapp.com",
  projectId: "prueba-4d07d",
  storageBucket: "prueba-4d07d.appspot.com",
  messagingSenderId: "85683004433",
  appId: "1:85683004433:web:c4a1113ec573efdc5c7db0"
})

export const auth = app.auth()
export default app
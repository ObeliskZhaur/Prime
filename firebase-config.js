import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "zinc-forge-457018-m3.firebaseapp.com",
  projectId: "zinc-forge-457018-m3",
  storageBucket: "zinc-forge-457018-m3.appspot.com",
  messagingSenderId: "your-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

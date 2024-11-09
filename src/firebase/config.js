import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC_bOxRe2BbxikXCkARN3V2pSuEMCVZioU",
  authDomain: "fir-c2e29.firebaseapp.com",
  projectId: "fir-c2e29",
  storageBucket: "fir-c2e29.firebasestorage.app",
  messagingSenderId: "200653706091",
  appId: "1:200653706091:web:735fbec1db21e1d5ddb22e",
  measurementId: "G-J7X4SM15MV"
};

  initializeApp(firebaseConfig);

  const db = getFirestore();

  export {db}
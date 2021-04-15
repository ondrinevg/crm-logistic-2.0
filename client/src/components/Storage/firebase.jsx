import firebase from 'firebase'

const config = {
  apiKey: process.env.REACT_APP_APIKEY_FIREBASE,
  authDomain: `${process.env.REACT_APP_PROJECTID_FIREBASE}.firebaseapp.com`,
  projectId: process.env.REACT_APP_PROJECTID_FIREBASE,
  storageBucket: `${process.env.REACT_APP_PROJECTID_FIREBASE}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID_FIREBASE,
  appId: process.env.REACT_APP_APPID_FIREBASE,
}

firebase.initializeApp(config)
export default firebase

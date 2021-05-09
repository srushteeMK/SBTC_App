import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyDRmBHSfPEllATnL4hM7pqjsMvO6DZCOLs",
  authDomain: "sbtc-copy.firebaseapp.com",
  projectId: "sbtc-copy",
  storageBucket: "sbtc-copy.appspot.com",
  messagingSenderId: "698340983597",
  appId: "1:698340983597:web:92b008e95f60d1540549a4"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

  export default firebase.firestore()
import firebase from "firebase";
const config = {
    apiKey: "AIzaSyAv6kNsZIiRFy3q2iarTHsfYDO_Dv9c-3A",
    authDomain: "fir-shop-d91f7.firebaseapp.com",
    databaseURL: "https://fir-shop-d91f7.firebaseio.com",
    projectId: "fir-shop-d91f7",
    storageBucket: "fir-shop-d91f7.appspot.com",
    messagingSenderId: "1023322052071"
};
firebase.initializeApp(config);
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export {db}
export default firebase;
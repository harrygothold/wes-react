import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBzoXSXKgU2H8rrlKMqkEq43zloywRXJ9w",
    authDomain: "wes-react-db.firebaseapp.com",
    databaseURL: "https://wes-react-db.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
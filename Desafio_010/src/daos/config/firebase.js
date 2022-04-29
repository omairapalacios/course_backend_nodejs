const admin = require('firebase-admin');
const serviceAccount = require('./firebase-credentials.json');

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://omaira-coderhouse-default-rtdb.firebaseio.com/',
});

const firebaseDb = firebase.firestore();

module.exports = {
  firebaseDb,
  admin
};



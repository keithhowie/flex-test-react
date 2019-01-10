import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBnB4GMcZ4lKs-SpDjoG6_4iPgLMFPOwyU',
  authDomain: 'flex-test-83bd9.firebaseapp.com',
  databaseURL: 'https://flex-test-83bd9.firebaseio.com',
  projectId: 'flex-test-83bd9',
  storageBucket: 'flex-test-83bd9.appspot.com',
  messagingSenderId: '934164892077'
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
export default firebase;
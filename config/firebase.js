const admin = require('firebase-admin');

const serviceAccount = require('./binar-game-wv31db-firebase-adminsdk-eu47x-1dcfb4c939.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://binar-game-wv31db.appspot.com', // Your Firebase Storage bucket URL
});

const bucket = admin.storage().bucket();

module.exports = { admin, bucket };

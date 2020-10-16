const dotenv = require("dotenv");
const admin = require("firebase-admin");
const serviceAccount = require("./json/perfirec-9b8ef-firebase-adminsdk-kyjlm-cbf26fdf7c.json");

dotenv.config();

// Initialize Firebase
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

module.exports = firebaseApp;

// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, requestPermission } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCoZGGCijkl8Mdc3dFQrmWaK3SLzTsmEQg",
  authDomain: "shopraipur-50dc7.firebaseapp.com",
  projectId: "shopraipur-50dc7",
  storageBucket: "shopraipur-50dc7.firebasestorage.app",
  messagingSenderId: "1029800559517",
  appId: "1:1029800559517:web:c2bc4a516c7ea7fb9fa574",
  measurementId: "G-L7T08DR9TM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = getMessaging(app);

// Request permission to show notifications
const requestNotificationPermission = async () => {
  try {
    await Notification.requestPermission();
    console.log("Notification permission granted.");
    const token = await getToken(messaging, { vapidKey: "BHUvf_21-vIiddMCvtvYspELW5SCDyy9_29ODwnZWavTL9lnopt-4OXVwmJdncoB-YN6F3oyLhGqpo_T1jwRZiY " });
    console.log("FCM Token:", token);
  } catch (err) {
    console.log("Error getting permission or token:", err);
  }
};

requestNotificationPermission();

export { messaging };

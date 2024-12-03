// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyCoZGGCijkl8Mdc3dFQrmWaK3SLzTsmEQg",
  
    authDomain: "shopraipur-50dc7.firebaseapp.com",
  
    projectId: "shopraipur-50dc7",
  
    storageBucket: "shopraipur-50dc7.firebasestorage.app",
  
    messagingSenderId: "1029800559517",
  
    appId: "1:1029800559517:web:c2bc4a516c7ea7fb9fa574",
  
    
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


  
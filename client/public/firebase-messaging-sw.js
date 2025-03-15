
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');


firebase.initializeApp({
    apiKey: "AIzaSyBH_IDHgGhuDcCue1MjgacDxO4qAl68r9w",
    authDomain: "expirytracker2.firebaseapp.com",
    projectId: "expirytracker2",
    storageBucket: "expirytracker2.firebasestorage.app",
    messagingSenderId: "518333830636",
    appId: "1:518333830636:web:b40a05b95b38e31c0e1cc9",
    measurementId: "G-QT7ZESWKRW"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();



messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
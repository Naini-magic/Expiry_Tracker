// import { initializeApp } from 'firebase/app';
// import { getMessaging, onBackgroundMessage } from 'firebase/messaging';

// // Your Firebase project configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBtWqbKVlPF9AbNx9PjuYJGqJ-cEm8ZN9Q",
//   authDomain: "expirytracker-notification.firebaseapp.com",
//   projectId: "expirytracker-notification",
//   storageBucket: "expirytracker-notification.firebasestorage.app",
//   messagingSenderId: "514869228592",
//   appId: "1:514869228592:web:7d49f29ac6bfbd6bd069f5",
//   measurementId: "G-163BXXTJHX"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Messaging
// const messaging = getMessaging(app);

// // Set up background message handler
// onBackgroundMessage(messaging, (payload) => {
//   console.log('Received background message', payload);

//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });




















importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);




const firebaseConfig = {
  apiKey: "AIzaSyBtWqbKVlPF9AbNx9PjuYJGqJ-cEm8ZN9Q",
  authDomain: "expirytracker-notification.firebaseapp.com",
  projectId: "expirytracker-notification",
  // storageBucket: "expirytracker-notification.appspot.com",
  storageBucket: "expirytracker-notification.appspot.com",
  messagingSenderId: "514869228592",
  appId: "1:514869228592:web:7d49f29ac6bfbd6bd069f5",
  measurementId: "G-163BXXTJHX"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message', payload);


  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});



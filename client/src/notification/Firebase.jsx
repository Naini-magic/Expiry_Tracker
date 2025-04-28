import { initializeApp } from "firebase/app";
import { getMessaging , getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBtWqbKVlPF9AbNx9PjuYJGqJ-cEm8ZN9Q",
  authDomain: "expirytracker-notification.firebaseapp.com",
  projectId: "expirytracker-notification",
  // storageBucket: "expirytracker-notification.firebasestorage.app",
  storageBucket: "expirytracker-notification.appspot.com",
  messagingSenderId: "514869228592",
  appId: "1:514869228592:web:7d49f29ac6bfbd6bd069f5",
  measurementId: "G-163BXXTJHX"
};

const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);



export const generateToken = async () => {
  try {

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: vapidKey 
      });



      console.log("FCM Token current token:", token);
      return token;
    } else {
      throw new Error("Notification permission not granted");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
    throw error; 
  }
};


// export const onMessageListener = () => {
//   return new Promise((resolve, reject) => {
//     onMessage(messaging, (payload) => {
//       if (payload) {
//         // console.log(payload);
//         resolve(payload);
//       } else {
//         reject(new Error("No payload received"));
//       }
//     });
//   });
// };

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging , (payload) => {
      resolve(payload);
    })
  })
}
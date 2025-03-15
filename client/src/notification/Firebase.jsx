import { initializeApp } from "firebase/app";
import { getMessaging , getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBH_IDHgGhuDcCue1MjgacDxO4qAl68r9w",
  authDomain: "expirytracker2.firebaseapp.com",
  projectId: "expirytracker2",
  storageBucket: "expirytracker2.firebasestorage.app",
  messagingSenderId: "518333830636",
  appId: "1:518333830636:web:b40a05b95b38e31c0e1cc9",
  measurementId: "G-QT7ZESWKRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);



export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BEyKf-wIJKHSmXOP7mEiS7MabAdez4N1OZo3Bl8SaZ8gjKb-PZcn5_uHCL7zFWfOXtPTbdoMPFUyq6RfkCTuFQs",
      });
      console.log("FCM Token:", token);
      return token;
    } else {
      throw new Error("Notification permission not granted");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

// export const generateToken = async () => {
//   const permission = await Notification.requestPermission();
//   console.log(permission);
//   if(permission === "granted"){
//       const token = await getToken(messaging , {
//         vapidKey: "BEyKf-wIJKHSmXOP7mEiS7MabAdez4N1OZo3Bl8SaZ8gjKb-PZcn5_uHCL7zFWfOXtPTbdoMPFUyq6RfkCTuFQs"
//       });
//       console.log(token);
//   }else{
//     throw new Error("Notification not granted")
//   }
// }

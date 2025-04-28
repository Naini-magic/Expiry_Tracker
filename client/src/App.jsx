import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import Navbar from "./components/NavbarSection/Navbar";
import Sidebar from "./components/SidebarComponents/Sidebar";
import AddItem from "./components/SidebarComponents/AddItem";
import Collection from "./components/SidebarComponents/Collection";
import ExpiryForm from "./components/SidebarComponents/ExpiryForm";

import "./App.css";
import ProductPage from "./components/Pages/ProductPage";
import { useEffect, useState } from "react";
import { generateToken, messaging , onMessageListener} from "./notification/Firebase";
// import { onMessage } from "firebase/messaging";
// import Layout from "./components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./auth/Login";
import Register from "./auth/Register";
import EditProfile from "./auth/EditProfile";
import ExpiriedItem from "./components/Pages/ExpiriedItem";


function App() {



  const [fcmToken, setFcmToken] = useState(null);



  // newly added
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((err) => {
          console.error('Service Worker registration failed:', err);
        });
    }
  }, []);

  useEffect(() => {
    const fetchFcmToken = async () => {
      try {
        const token = await generateToken();
        setFcmToken(token);
        console.log("FCM Token:", token);
      } catch (err) {
        console.error("Error getting FCM token", err);
      }
    };

    fetchFcmToken();
    
  
  }, []);


  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        toast(
          <div>
            <div><strong>{payload.notification.title}</strong></div>
            <div>{payload.notification.body}</div>
          </div>
        );
        console.log("Received foreground message:", payload);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  



  
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={5000} />
   
        {/* Sidebar (Fixed) */}
        <Sidebar />

        {/* Main Content Wrapper */}
       
          {/* Navbar (Fixed at Top) */}
          <Navbar />
          {/* <Layout/> */}

          {/* Page Content (Takes Full Remaining Space) */}
          <div className="flex-1 lg:p-6 md:p-6 sm:p-3 mt-20 lg:ml-20 md:ml-20 sm:ml-2 overflow-auto">
            <Routes>
              <Route path="/" element={< Home/>} />
              <Route path="/add-item" element={<AddItem />} />
              <Route path="/expiry-form/:barcode?" element={<ExpiryForm/>} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/collection/:name" element={<Collection/>}/>
              <Route path="/expiriedItem" element={<ExpiriedItem />} />
              <Route path="/product/:id" element={<ProductPage/>} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              {/* <Route path="/profile" element={<Profile/>}/> */}
              <Route path="/edit-profile" element={<EditProfile/>}/>
            </Routes>
          </div>
        
    
    </Router>
  );
}

export default App;

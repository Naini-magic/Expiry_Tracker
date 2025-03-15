import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SidebarComponents/Sidebar";
import AddItem from "./components/SidebarComponents/AddItem";
import Collection from "./components/SidebarComponents/Collection";
import Notification from "./components/SidebarComponents/Notification";
import ExpiryForm from "./components/SidebarComponents/ExpiryForm";

import "./App.css";
import ProductPage from "./components/ProductPage";
import { useEffect, useState } from "react";
import { generateToken, messaging } from "./notification/Firebase";
import { onMessage } from "firebase/messaging";
// import Layout from "./components/Layout";


function App() {


  // useEffect(() => {
  //   generateToken();
  //   onMessage(messaging , (payload) => {
  //     console.log(payload);
  //   });
  // } , []);

  const [fcmToken, setFcmToken] = useState(null);

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

    // Listen for foreground messages
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Received foreground message:", payload);
    });

    return () => {
      unsubscribe(); // Cleanup the listener
    };
  }, []);



  return (
    <Router>
   
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
              <Route path="/notifications" element={<Notification />} />
              <Route path="/product/:id" element={<ProductPage/>} />
            </Routes>
          </div>
        
    
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SidebarComponents/Sidebar";
import AddItem from "./components/SidebarComponents/AddItem";
import Collection from "./components/SidebarComponents/Collection";
import Notification from "./components/SidebarComponents/Notification";
import ExpiryForm from "./components/SidebarComponents/ExpiryForm";

import "./App.css";



function App() {
  return (
    <Router>
   
        {/* Sidebar (Fixed) */}
        <Sidebar />

        {/* Main Content Wrapper */}
       
          {/* Navbar (Fixed at Top) */}
          <Navbar />

          {/* Page Content (Takes Full Remaining Space) */}
          <div className="flex-1 p-6 mt-16 ml-20 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-item" element={<AddItem />} />
              <Route path="/expiry-form/:barcode?" element={<ExpiryForm />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/notifications" element={<Notification />} />
            </Routes>
          </div>
        
    
    </Router>
  );
}

export default App;

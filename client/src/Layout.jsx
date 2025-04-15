// components/Layout.jsx
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* Background for all pages */}
      <div className="absolute inset-0 -z-10">
        <img 
          alt="Blurred decorative background" 
          loading="lazy" 
          decoding="async" 
          data-nimg="fill" 
          className="hidden md:block object-cover object-bottom transition-[mask-image] duration-500 lg:object-fill" 
          sizes="100vw" 
          srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FheroBg-blur-small.e33d9b5e.png&w=640&q=75 640w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FheroBg-blur-small.e33d9b5e.png&w=750&q=75 750w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FheroBg-blur-small.e33d9b5e.png&w=828&q=75 828w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FheroBg-blur-small.e33d9b5e.png&w=1080&q=75 1080w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FheroBg-blur-small.e33d9b5e.png&w=1200&q=75 1200w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FheroBg-blur-small.e33d9b5e.png&w=1920&q=75 1920w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FheroBg-blur-small.e33d9b5e.png&w=2048&q=75 2048w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FheroBg-blur-small.e33d9b5e.png&w=3840&q=75 3840w" 
          src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FheroBg-blur-small.e33d9b5e.png&w=3840&q=75" 
          style={{ 
            position: "absolute", 
            height: "100%", 
            width: "100%", 
            inset: "0px", 
            color: "transparent",
            opacity: 0.5
          }}
        />
      </div>
      
      {/* Page content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default Layout;
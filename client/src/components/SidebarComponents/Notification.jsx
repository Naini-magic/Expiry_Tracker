import React, { useState, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";



const Notification = () => {
  const [scannedResult, setScannedResult] = useState("");
  const videoRef = React.useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader
      .decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
        if (result) {
          setScannedResult(result.text);
          console.log("Scanned Result: ", result.text);
        }
      })
      .catch((err) => console.error("Error starting barcode scanner: ", err));

    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-2">Barcode Scanner</h2>
      <video ref={videoRef} className="w-96 h-64 border border-gray-400"></video>
      {scannedResult && (
        <p className="mt-4 p-2 bg-green-200 rounded">Scanned Code: {scannedResult}</p>
      )}
    </div>
  );

};
export default Notification;
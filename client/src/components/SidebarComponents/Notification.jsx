import React from "react";


const Notification = ({ onDetected }) => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [manualBarcode, setManualBarcode] = useState("");

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader
      .decodeFromVideoDevice(undefined, videoRef.current, (result) => {
        if (result) {
          navigate(`/expiry-form/${result.text}`); // Navigate with scanned barcode
        }
      })
      .catch((err) => console.error("Barcode scanning error:", err));

    return () => {
      codeReader.reset();
    };
  }, [navigate]);

  // Handle manual input and navigate
  const handleManualSubmit = () => {
    if (manualBarcode.trim() !== "") {
      navigate(`/expiry-form/${manualBarcode}`);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-300">
      <h2 className="text-xl font-bold pt-5 ">Scan or Enter Barcode</h2>

      <video ref={videoRef} className="w-64 h-64"></video>

      <div className="mt-2 flex gap-2 pb-3">
        <input
          type="text"
          placeholder="Enter Barcode Number"
          value={manualBarcode}
          onChange={(e) => setManualBarcode(e.target.value)}
          className="border border-gray-600 rounded-2xl p-2 w-48"
        />
        <button onClick={handleManualSubmit} className="bg-gray-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Notification;


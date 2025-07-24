// import React, { useState, useRef, useEffect } from 'react';

// interface CameraProps {
//   onCapture: (imageData: string) => void;
// }

// const Camera: React.FC<CameraProps> = ({ onCapture }) => {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     // בקשת גישה למצלמה ברגע שהקומפוננטה עולה
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//         setHasPermission(true);
//       } catch (err) {
//         console.error('Camera permission denied', err);
//         setHasPermission(false);
//       }
//     };

//     startCamera();
//   }, []);

//   const captureImage = () => {
//     if (!canvasRef.current || !videoRef.current) return;

//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     if (!context) return;

//     // ציור מהווידאו לתוך הקנבס
//     context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//     const imageData = canvas.toDataURL('image/jpeg');
//     setCapturedImage(imageData);         // שמירת התמונה בתצוגה
//     onCapture(imageData);                // שליחה לפונקציה חיצונית אם צריך
//   };

//   return (
//     <div>
//       {hasPermission === null && <p>טוען מצלמה...</p>}
//       {hasPermission === false && <p>גישה למצלמה נדחתה.</p>}
//       {hasPermission && (
//         <div>
//           <video ref={videoRef} autoPlay width="320" height="240" />
//           <br />
//           <button onClick={captureImage}>📸 צלם תמונה</button>
//           <canvas
//             ref={canvasRef}
//             width="320"
//             height="240"
//             style={{ display: 'none' }}
//           />
//           {capturedImage && (
//             <div>
//               <h4>תמונה שצולמה:</h4>
//               <img src={capturedImage} alt="Captured" style={{ border: '1px solid #ccc' }} />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Camera;
import React, { useRef, useState } from "react";

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const captureAndSend = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    setLoading(true); // Start loading state
    setError(null); // Reset error state

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append("image", blob, "photo.jpg");

      try {
        const res = await fetch("http://localhost:5000/predict-gender", {
          // Make sure the URL is correct!
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error("הייתה שגיאה בבקשה מהשרת");
        }

        const result = await res.json();
        setGender(result.gender); // Update the gender state with the server response
      } catch (error) {
        setError("לא ניתן לחבר לשרת. בבקשה נסה שוב מאוחר יותר.");
      } finally {
        setLoading(false); // Stop loading state after request
      }
    }, "image/jpeg");
  };

  return (
    <div>
      <h2>מצלמה</h2>
      <video ref={videoRef} autoPlay width="400" height="300" />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div>
        <button onClick={startCamera}>הפעל מצלמה</button>
        <button onClick={captureAndSend} disabled={loading}>
          צלם ושלח
        </button>
      </div>
      {loading && <p>טעינה...</p>}
      {gender && <p>המגדר שזוהה: {gender}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Camera;

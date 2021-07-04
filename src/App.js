// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import loader from './loader.gif';
import * as tf from "@tensorflow/tfjs";
// 1. Import required model here
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
// 2. Import drawing utility here
import drawRect from "./utils";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [loading, setLoading] = useState(true);

  // Main function
  const runCoco = async () => {
    // 3. Load network 
    const net = await cocoSsd.load();
    
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
      setLoading(false);
    }, 50);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set video width
      video.width = videoWidth;
      video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. Make Detections
      const obj = await net.detect(video);
      console.log(obj);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. Update drawing utility
      drawRect(obj, ctx)  
    }
  };

  useEffect(()=>{
    runCoco()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Object detection using COCO-SSD Model</h1>
        {
          loading ? 
            <div style={{
              position: "absolute",
              top: 350,
              left: 0,
              right: 0,
              textAlign: "center",
            }}>
              <img src={loader} alt="Loading...." width="100" height="100" />
            </div> : 
            <>
            <Webcam
              ref={webcamRef}
              muted={true} 
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 9,
                width: 640,
                height: 480,
                marginTop: 50
              }}
            />
            <canvas ref={canvasRef} className="canvass" style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
            marginTop: 50
          }}/>
            </>
        }
      </header>
    </div>
  );
}

export default App;

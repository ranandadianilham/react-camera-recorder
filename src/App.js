import React, { useEffect, useRef, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import "./App.css";

function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator?.mediaDevices
      ?.getUserMedia({
        video: {
          width: 1920,
          height: 1080,
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takeVideo = () => {
    const width = 414;
    const height = width / (16/9);
    
    let video = videoRef?.current;
    let photo = photoRef?.current;
 
    photo.width = width;
    photo.height = height;

    let ctx = photo?.getContext('2d');
    ctx?.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  }

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="App">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takeVideo}>Take</button>
      </div>
      <div className={`result` + (hasPhoto ? 'hasPhoto': '')}>
        <canvas ref={photoRef}></canvas>
        <button>close</button>
      </div>
    </div>
  );
}

export default App;

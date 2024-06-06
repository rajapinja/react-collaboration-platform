import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';

const socket = io('http://localhost:3001');

function VideoCall() {
  const videoRef = useRef();
  const peerRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;

        socket.emit('join-room', 'room-123', 'user-123');

        socket.on('user-connected', (userId) => {
          const peer = new SimplePeer({ initiator: true, trickle: false, stream });

          peer.on('signal', (data) => {
            socket.emit('offer', userId, data);
          });

          peer.on('data', (data) => {
            // Handle incoming data
          });

          peer.on('stream', (userStream) => {
            // Display remote stream in video element
            const remoteVideo = document.createElement('video');
            remoteVideo.srcObject = userStream;
            document.getElementById('remote-videos').appendChild(remoteVideo);
          });

          peerRef.current = peer;
        });

        socket.on('user-disconnected', (userId) => {
          if (peerRef.current) {
            peerRef.current.destroy();
          }
        });
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted></video>
      <div id="remote-videos"></div>
    </div>
  );
}

export default VideoCall;

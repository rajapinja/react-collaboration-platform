// React component to set up Socket.io
import React, { useEffect } from 'react';
import io from 'socket.io-client';

function ChatApp() {
  useEffect(() => {
    const socket = io('http://your-server-url');

    socket.on('message', (data) => {
      console.log('Received message:', data);
      // Update chat UI with received message
    });

    // Emit a message
    socket.emit('message', 'Hello, server!');
  }, []);

  return (
    <div>
      {/* Chat UI */}
    </div>
  );
}

export default ChatApp;

import { useState, useEffect, useCallback } from 'react';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'SEARCH_RESULTS') {
        setSearchResults(data.data);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  const search = useCallback((query) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'SEARCH', query }));
    }
  }, [socket]);

  return { search, searchResults, isConnected };
};

export default useWebSocket;

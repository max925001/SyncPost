import Post from '../models/post.model.js';

export const handleSocketConnection = (ws) => {
  console.log('Client connected via WebSocket');

  ws.on('message', async (message) => {
    try {
      const { type, query } = JSON.parse(message);

      if (type === 'SEARCH') {
        // Search by title or body using regex for real-time feel
        const results = await Post.find({
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { body: { $regex: query, $options: 'i' } }
          ]
        });

        ws.send(JSON.stringify({ type: 'SEARCH_RESULTS', data: results }));
      }
    } catch (error) {
      console.error('Socket Message Error:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
};

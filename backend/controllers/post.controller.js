import axios from 'axios';
import Post from '../models/post.model.js';

export const syncPosts = async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;

    // Use bulkWrite for efficiency
    const operations = posts.map(post => ({
      updateOne: {
        filter: { id: post.id },
        update: post,
        upsert: true
      }
    }));

    await Post.bulkWrite(operations);
    
    res.status(200).json({ message: 'Posts synced successfully', count: posts.length });
  } catch (error) {
    console.error('Sync Error:', error);
    res.status(500).json({ message: 'Error syncing posts', error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ id: 1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      posts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      totalPosts
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ id: req.params.id });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  }
};

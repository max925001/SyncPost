import express from 'express';
import { getAllPosts, getPostById, syncPosts } from '../controllers/post.controller.js';

const router = express.Router();

// @route   GET /api/posts/sync
router.get('/sync', syncPosts);

// @route   GET /api/posts
router.get('/', getAllPosts);

// @route   GET /api/posts/:id
router.get('/:id', getPostById);

export default router;

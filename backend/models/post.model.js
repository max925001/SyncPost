import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
}, { timestamps: true });

// Index for search optimization
postSchema.index({ title: 'text', body: 'text' });

export default mongoose.model('Post', postSchema);

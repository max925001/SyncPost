import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Hash, FileText } from 'lucide-react';

const PostModal = ({ post, isOpen, onClose }) => {
  if (!post) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10"
          >
            {/* Image Section */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-800">
              <img
                src={`https://picsum.photos/seed/${post.id}/800/600`}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-slate-950/50 hover:bg-slate-950 text-white rounded-full backdrop-blur-md transition-all border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Details Section */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-violet-600/20 rounded-lg border border-violet-500/20">
                  <Hash className="w-3 h-3 text-violet-400" />
                  <span className="text-xs font-bold text-violet-400">Post #{post.id}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-600/20 rounded-lg border border-blue-500/20">
                  <User className="w-3 h-3 text-blue-400" />
                  <span className="text-xs font-bold text-blue-400">User ID: {post.userId}</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 leading-tight">
                {post.title}
              </h2>

              <div className="flex gap-4">
                <div className="flex-shrink-0 pt-1">
                  <FileText className="w-5 h-5 text-slate-500" />
                </div>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {post.body}
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-800 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-violet-500/20"
                >
                  Close Detail
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PostModal;

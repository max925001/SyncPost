import React from 'react';
import { motion } from 'framer-motion';

const PostCard = ({ post, onViewDetail }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-violet-500/50 transition-colors group flex flex-col h-full shadow-lg"
    >
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden bg-slate-800">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
        <img
          src={`https://picsum.photos/seed/${post.id}/600/400`}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className="px-2 py-1 bg-violet-600/80 backdrop-blur-md text-[10px] font-bold text-white rounded uppercase tracking-wider">
            ID: {post.id}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative">
        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-violet-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed flex-grow">
          {post.body}
        </p>
        
        <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-[10px] text-violet-400 font-bold border border-violet-500/30">
              U{post.userId}
            </div>
            <span className="text-xs text-slate-500">User {post.userId}</span>
          </div>
          <button 
            onClick={() => onViewDetail(post)}
            className="text-violet-400 text-xs font-semibold hover:text-violet-300 transition-colors cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(PostCard);

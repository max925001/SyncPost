import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Search, Loader2, RefreshCcw, Database, X, ChevronLeft, ChevronRight, AlertCircle, Inbox } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useWebSocket from './hooks/useWebSocket';
import PostCard from './components/PostCard';
import PostModal from './components/PostModal';

const API_BASE = 'http://localhost:5000/api';
const WS_URL = 'ws://localhost:5000';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { search, searchResults, isConnected } = useWebSocket(WS_URL);

  // Fetch posts when page changes
  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/posts?page=${pageNum}&limit=30`);
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    try {
      setIsSyncing(true);
      await axios.get(`${API_BASE}/posts/sync`);
      setPage(1); // Reset to first page
      await fetchPosts(1);
    } catch (err) {
      console.error('Sync error:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleViewDetail = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setDebouncedQuery('');
  };

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle real-time search with debounced query
  useEffect(() => {
    if (debouncedQuery.trim()) {
      search(debouncedQuery);
    }
  }, [debouncedQuery, search]);

  // Determine which posts to display
  const displayPosts = useMemo(() => {
    return searchQuery.trim() ? searchResults : posts;
  }, [searchQuery, searchResults, posts]);

  return (
    <div className="min-h-screen pb-32 px-4 sm:px-6 lg:px-8">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-pink-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto pt-12 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="p-4 bg-violet-600 rounded-3xl shadow-2xl shadow-violet-500/40"
            >
              <Database className="text-white w-8 h-8" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                JSON<span className="text-violet-500">Post</span> Sync
              </h1>
              <p className="mt-1 text-slate-400 font-medium tracking-wide flex items-center gap-2 uppercase text-[10px]">
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
                Real-time MongoDB Search Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-2xl font-bold transition-all shadow-xl border border-slate-800 hover:border-violet-500/50 group"
            >
              <RefreshCcw className={`w-5 h-5 transition-transform duration-500 ${isSyncing ? 'animate-spin' : 'group-hover:rotate-180'}`} />
              {isSyncing ? 'Synchronizing...' : 'Sync Database'}
            </button>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">WS Network</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-full border border-slate-800">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`} />
                <span className={`text-[10px] font-bold ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                  {isConnected ? 'LIVE' : 'OFFLINE'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="max-w-5xl mx-auto mb-16 relative sticky top-6 z-30 pt-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-violet-600/20 blur-3xl group-focus-within:bg-violet-600/40 transition-all rounded-full pointer-events-none" />
          <div className="relative flex items-center bg-slate-900/90 backdrop-blur-2xl border border-slate-800 focus-within:border-violet-500/50 rounded-3xl transition-all shadow-2xl overflow-hidden">
            <Search className="absolute left-7 text-slate-500 w-6 h-6 group-focus-within:text-violet-400 transition-colors" />
            <input
              type="text"
              placeholder="Start typing to search posts instantly..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-18 pr-20 py-6 text-xl text-white outline-none bg-transparent placeholder:text-slate-600"
            />
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="absolute right-7 p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-48 gap-6">
            <Loader2 className="animate-spin text-violet-500 w-16 h-16" />
            <p className="text-slate-400">Retrieving Records...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {displayPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <AnimatePresence mode="popLayout" initial={false}>
                  {displayPosts.map((post) => (
                    <PostCard 
                      key={post.id} 
                      post={post} 
                      onViewDetail={handleViewDetail}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-32 bg-slate-900/40 backdrop-blur-sm border border-dashed border-slate-800 rounded-[3rem] text-center"
              >
                <div className="p-6 bg-slate-800/50 rounded-full mb-6">
                  <Inbox className="w-12 h-12 text-slate-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No Records Found</h3>
                <p className="text-slate-500 max-w-sm mb-8">
                  {searchQuery 
                    ? `No matching posts found for "${searchQuery}". Try a different search term or sync your database.`
                    : "Your database appears to be empty. Click the Sync button to fetch data."}
                </p>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold transition-all border border-slate-700 hover:border-violet-500/50"
                  >
                    Clear Search Query
                  </button>
                )}
              </motion.div>
            )}

            {/* Pagination Controls - Only show when not searching and data exists */}
            {!searchQuery && displayPosts.length > 0 && (
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-16 pb-10">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white rounded-xl border border-slate-800 transition-all cursor-pointer disabled:cursor-not-allowed group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Previous
                </button>
                
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-xl font-bold transition-all ${
                        page === i + 1 
                          ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' 
                          : 'bg-slate-900 text-slate-500 hover:bg-slate-800 border border-slate-800 cursor-pointer'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white rounded-xl border border-slate-800 transition-all cursor-pointer disabled:cursor-not-allowed group"
                >
                  Next
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      <PostModal 
        post={selectedPost} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Footer */}
      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div className="px-6 py-3 bg-slate-900/80 backdrop-blur-2xl rounded-2xl border border-slate-800 shadow-2xl flex items-center gap-6 text-[10px] font-black uppercase text-slate-400 tracking-tighter">
          <span>{displayPosts.length > 0 ? `Page ${page} of ${totalPages}` : "No Results"}</span>
          <div className="h-4 w-px bg-slate-800" />
          <span>Post Synchronization Service</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

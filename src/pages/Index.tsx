import { useEffect, useState, useCallback } from 'react';
import { PostEditor } from '@/components/PostEditor';
import { PostCard } from '@/components/PostCard';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { initializeDemoPosts } from '@/utils/initializeDemoPosts';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { FadeIn } from '@/components/ui/fade-in';

interface Post {
  id: string;
  profile: string;
  content: string;
  created_at: string;
  emoji?: string;
  username: string;
}

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const fetchPosts = useCallback(() => {
    const postsKey = 'forum_posts';
    const storedPosts = localStorage.getItem(postsKey);

    if (storedPosts) {
      try {
        const parsedPosts = JSON.parse(storedPosts);
        setPosts(parsedPosts);
      } catch (error) {
        console.error('Error parsing posts:', error);
        setPosts([]);
      }
    } else {
      setPosts([]);
    }
  }, []);

  useEffect(() => {
    // Initialize demo posts on first load
    initializeDemoPosts();
    fetchPosts();
  }, [fetchPosts]);

  const handleInteractionClick = () => {
    if (!user) {
      setShowAuthModal(true);
    }
  };

  return (
    <FadeIn className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pt-8">
        <div className="space-y-6">
          {/* Post Editor */}
          <div onClick={handleInteractionClick}>
            <PostEditor onPostCreated={fetchPosts} />
          </div>

          {/* Posts Feed */}
          <div className="space-y-4 h-[calc(100vh_-_370px)] overflow-y-auto">
            {posts.map((post) => (
              <div key={post.id} onClick={handleInteractionClick}>
                <PostCard
                  profile={post.profile}
                  username={post.username || 'Anonymous'}
                  content={post.content}
                  createdAt={new Date(post.created_at)}
                  emoji={post.emoji}
                />
              </div>
            ))}

            {posts.length === 0 && (
              <div className="text-center py-12 text-gray-600">
                <p>No posts yet. Be the first to share!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </FadeIn>
  );
};

export default Index;

export const initializeDemoPosts = () => {
  const postsKey = 'forum_posts';
  // const existingPosts = localStorage.getItem(postsKey);

  // // Only initialize if there are no posts
  // if (!existingPosts) {
    const demoPosts = [
      {
        id: 'demo-post-1',
        user_id: 'static-1',
        profile: 'profile.png',
        username: 'demo',
        content: 'Welcome to foo-rum! This is a demo post to help you get started. Feel free to create your own posts!',
        created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      },
      {
        id: 'demo-post-2',
        user_id: 'static-2',
        profile: 'profile.png',
        username: 'testuser',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      },
      {
        id: 'demo-post-3',
        user_id: 'static-1',
        profile: 'profile.png',
        username: 'demo',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        created_at: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
      },
    ];

    localStorage.setItem(postsKey, JSON.stringify(demoPosts));
  // }
};


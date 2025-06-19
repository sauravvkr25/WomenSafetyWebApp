import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/community.css';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { FaUsers, FaComments, FaHeart, FaShare, FaBookmark } from 'react-icons/fa';

const Community = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sarah M.",
      avatar: "https://via.placeholder.com/50",
      content: "Just wanted to share a safety tip I learned recently - always share your location with trusted friends when traveling alone, especially at night. Stay safe everyone! 💪",
      likes: 24,
      comments: 8,
      shares: 3,
      timestamp: "2 hours ago",
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      author: "Priya K.",
      avatar: "https://via.placeholder.com/50",
      content: "Had a great experience with the emergency alert feature today. It's so reassuring to know help is just a button away. Thank you for this amazing platform! 🙏",
      likes: 31,
      comments: 12,
      shares: 5,
      timestamp: "5 hours ago",
      isLiked: true,
      isBookmarked: false
    },
    {
      id: 3,
      author: "Maria L.",
      avatar: "https://via.placeholder.com/50",
      content: "Looking for recommendations for self-defense classes in the downtown area. Any suggestions would be greatly appreciated! 💪",
      likes: 18,
      comments: 15,
      shares: 2,
      timestamp: "1 day ago",
      isLiked: false,
      isBookmarked: true
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleBookmark = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: "You",
        avatar: "https://via.placeholder.com/50",
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: "Just now",
        isLiked: false,
        isBookmarked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const handleJoinSupportGroup = () => {
    // Redirect to the SocialEcho social media app signin page
    // Using the SocialEcho client running on port 3004
    window.open('http://localhost:3004/signin', '_blank');
  };

  return (
    <>
      <Navbar />
      <div className="community-container">
        <div className="community-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h1 className="community-title">
                  <FaUsers className="community-icon" />
                  Women Safety Community
                </h1>
                <p className="community-subtitle">
                  Connect, share, and support each other in our safe and empowering community
                </p>
              </div>
              <div className="col-md-4 text-end">
                <div className="community-stats">
                  <div className="stat-item">
                    <span className="stat-number">1,247</span>
                    <span className="stat-label">Members</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">89</span>
                    <span className="stat-label">Posts Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="community-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                {/* Create Post */}
                <div className="create-post-card">
                  <form onSubmit={handleSubmitPost}>
                    <div className="post-input-container">
                      <img src="https://via.placeholder.com/40" alt="Your avatar" className="post-avatar" />
                      <textarea
                        className="post-input"
                        placeholder="Share your thoughts, experiences, or safety tips with the community..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        rows="3"
                      />
                    </div>
                    <div className="post-actions">
                      <button type="submit" className="btn btn-primary post-submit-btn">
                        Share Post
                      </button>
                    </div>
                  </form>
                </div>

                {/* Community Guidelines */}
                <div className="guidelines-card">
                  <h4>Community Guidelines</h4>
                  <ul>
                    <li>Be respectful and supportive of all members</li>
                    <li>Share helpful safety tips and experiences</li>
                    <li>Report any inappropriate content</li>
                    <li>Maintain privacy and confidentiality</li>
                  </ul>
                </div>

                {/* Posts Feed */}
                <div className="posts-feed">
                  {posts.map(post => (
                    <div key={post.id} className="post-card">
                      <div className="post-header">
                        <img src={post.avatar} alt={post.author} className="post-avatar" />
                        <div className="post-info">
                          <h5 className="post-author">{post.author}</h5>
                          <span className="post-timestamp">{post.timestamp}</span>
                        </div>
                      </div>
                      <div className="post-content">
                        <p>{post.content}</p>
                      </div>
                      <div className="post-actions">
                        <button 
                          className={`action-btn ${post.isLiked ? 'liked' : ''}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <FaHeart /> {post.likes}
                        </button>
                        <button className="action-btn">
                          <FaComments /> {post.comments}
                        </button>
                        <button className="action-btn">
                          <FaShare /> {post.shares}
                        </button>
                        <button 
                          className={`action-btn ${post.isBookmarked ? 'bookmarked' : ''}`}
                          onClick={() => handleBookmark(post.id)}
                        >
                          <FaBookmark />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-4">
                {/* Quick Actions */}
                <div className="quick-actions-card">
                  <h4>Quick Actions</h4>
                  <div className="action-buttons">
                    <button className="btn btn-danger btn-block mb-2">
                      Emergency Alert
                    </button>
                    <button className="btn btn-warning btn-block mb-2">
                      Report Incident
                    </button>
                    <button className="btn btn-info btn-block mb-2">
                      Safety Resources
                    </button>
                    <button className="btn btn-success btn-block" onClick={handleJoinSupportGroup}>
                      Join Support Group
                    </button>
                  </div>
                </div>

                {/* Safety Tips */}
                <div className="safety-tips-card">
                  <h4>Today's Safety Tip</h4>
                  <div className="tip-content">
                    <p>
                      <strong>Travel Safety:</strong> When using ride-sharing services, 
                      always verify the driver's information and share your trip details 
                      with a trusted friend or family member.
                    </p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="recent-activity-card">
                  <h4>Recent Activity</h4>
                  <div className="activity-list">
                    <div className="activity-item">
                      <span className="activity-text">New member joined</span>
                      <span className="activity-time">5 min ago</span>
                    </div>
                    <div className="activity-item">
                      <span className="activity-text">Safety tip shared</span>
                      <span className="activity-time">15 min ago</span>
                    </div>
                    <div className="activity-item">
                      <span className="activity-text">Support group created</span>
                      <span className="activity-time">1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Community; 
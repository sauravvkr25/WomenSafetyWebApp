import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/support-group.css';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { FaUsers, FaComments, FaHeart, FaShare, FaArrowLeft, FaShieldAlt, FaHandshake, FaLightbulb } from 'react-icons/fa';

const SupportGroup = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('groups');
  
  const [supportGroups] = useState([
    {
      id: 1,
      name: "Women's Safety Network",
      members: 156,
      description: "A supportive community for women to share safety tips and experiences",
      category: "General Safety",
      isJoined: true
    },
    {
      id: 2,
      name: "Night Shift Workers",
      members: 89,
      description: "Support group for women working late shifts and night jobs",
      category: "Workplace Safety",
      isJoined: false
    },
    {
      id: 3,
      name: "College Campus Safety",
      members: 234,
      description: "Students supporting each other on campus safety and awareness",
      category: "Student Safety",
      isJoined: false
    },
    {
      id: 4,
      name: "Travel Safety Community",
      members: 112,
      description: "Tips and support for women traveling alone or in groups",
      category: "Travel Safety",
      isJoined: true
    }
  ]);

  const [discussions] = useState([
    {
      id: 1,
      title: "Best self-defense techniques for beginners",
      author: "Sarah M.",
      replies: 23,
      views: 156,
      lastActivity: "2 hours ago",
      isPinned: true
    },
    {
      id: 2,
      title: "How to stay safe while using public transportation",
      author: "Priya K.",
      replies: 18,
      views: 89,
      lastActivity: "5 hours ago",
      isPinned: false
    },
    {
      id: 3,
      title: "Emergency contact apps recommendations",
      author: "Maria L.",
      replies: 31,
      views: 203,
      lastActivity: "1 day ago",
      isPinned: false
    }
  ]);

  const handleJoinGroup = (groupId) => {
    // This would typically make an API call to join the group
    console.log(`Joining group ${groupId}`);
  };

  const handleBackToCommunity = () => {
    navigate('/community');
  };

  return (
    <>
      <Navbar />
      <div className="support-group-container">
        <div className="support-group-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-8">
                <button 
                  className="back-btn"
                  onClick={handleBackToCommunity}
                >
                  <FaArrowLeft /> Back to Community
                </button>
                <h1 className="support-group-title">
                  <FaUsers className="support-group-icon" />
                  Support Groups
                </h1>
                <p className="support-group-subtitle">
                  Join specialized groups to connect with women who share similar safety concerns and experiences
                </p>
              </div>
              <div className="col-md-4 text-end">
                <div className="support-group-stats">
                  <div className="stat-item">
                    <span className="stat-number">12</span>
                    <span className="stat-label">Active Groups</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">591</span>
                    <span className="stat-label">Total Members</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="support-group-content">
          <div className="container">
            {/* Tab Navigation */}
            <div className="tab-navigation">
              <button 
                className={`tab-btn ${activeTab === 'groups' ? 'active' : ''}`}
                onClick={() => setActiveTab('groups')}
              >
                <FaUsers /> Support Groups
              </button>
              <button 
                className={`tab-btn ${activeTab === 'discussions' ? 'active' : ''}`}
                onClick={() => setActiveTab('discussions')}
              >
                <FaComments /> Discussions
              </button>
              <button 
                className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
                onClick={() => setActiveTab('resources')}
              >
                <FaLightbulb /> Resources
              </button>
            </div>

            {activeTab === 'groups' && (
              <div className="groups-section">
                <div className="row">
                  {supportGroups.map(group => (
                    <div key={group.id} className="col-lg-6 mb-4">
                      <div className="group-card">
                        <div className="group-header">
                          <div className="group-info">
                            <h4 className="group-name">{group.name}</h4>
                            <span className="group-category">{group.category}</span>
                          </div>
                          <div className="group-members">
                            <FaUsers />
                            <span>{group.members} members</span>
                          </div>
                        </div>
                        <p className="group-description">{group.description}</p>
                        <div className="group-actions">
                          {group.isJoined ? (
                            <button className="btn btn-outline-success btn-sm">
                              <FaHandshake /> Joined
                            </button>
                          ) : (
                            <button 
                              className="btn btn-success btn-sm"
                              onClick={() => handleJoinGroup(group.id)}
                            >
                              <FaUsers /> Join Group
                            </button>
                          )}
                          <button className="btn btn-outline-primary btn-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'discussions' && (
              <div className="discussions-section">
                <div className="discussions-header">
                  <h3>Active Discussions</h3>
                  <button className="btn btn-primary">
                    <FaComments /> Start New Discussion
                  </button>
                </div>
                <div className="discussions-list">
                  {discussions.map(discussion => (
                    <div key={discussion.id} className={`discussion-card ${discussion.isPinned ? 'pinned' : ''}`}>
                      {discussion.isPinned && (
                        <div className="pinned-badge">
                          <FaShieldAlt /> Pinned
                        </div>
                      )}
                      <div className="discussion-content">
                        <h5 className="discussion-title">{discussion.title}</h5>
                        <div className="discussion-meta">
                          <span className="discussion-author">by {discussion.author}</span>
                          <span className="discussion-stats">
                            {discussion.replies} replies • {discussion.views} views
                          </span>
                          <span className="discussion-time">{discussion.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="resources-section">
                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <div className="resource-card">
                      <div className="resource-icon">
                        <FaShieldAlt />
                      </div>
                      <h4>Safety Guides</h4>
                      <p>Comprehensive guides on personal safety, self-defense, and emergency preparedness.</p>
                      <button className="btn btn-primary">View Guides</button>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-4">
                    <div className="resource-card">
                      <div className="resource-icon">
                        <FaHandshake />
                      </div>
                      <h4>Support Services</h4>
                      <p>Connect with professional counselors, legal advisors, and safety experts.</p>
                      <button className="btn btn-primary">Find Services</button>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-4">
                    <div className="resource-card">
                      <div className="resource-icon">
                        <FaLightbulb />
                      </div>
                      <h4>Training Programs</h4>
                      <p>Self-defense classes, safety workshops, and empowerment training sessions.</p>
                      <button className="btn btn-primary">Browse Programs</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SupportGroup; 
 
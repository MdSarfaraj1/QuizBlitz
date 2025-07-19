import React, { useState } from 'react';
import { Bell, X, Clock, Users, Trophy, Target, Calendar, Gift, Lightbulb, AlertTriangle, Megaphone, BookOpen, Brain } from 'lucide-react';

const NotificationModal = ({ isModalOpen, setIsModalOpen }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'new_quiz',
      icon: Brain,
      title: 'New Quiz Available',
      message: 'A new quiz on Operating Systems is available – Test your knowledge now!',
      time: '2 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'live_quiz',
      icon: Clock,
      title: 'Live Quiz Starting Soon',
      message: '🚨 Live Quiz on Data Structures starts in 10 minutes. Join now!',
      time: '8 minutes ago',
      unread: true
    },
    {
      id: 3,
      type: 'multiplayer_request',
      icon: Users,
      title: 'Multiplayer Quiz Request',
      message: '📨 Your friend Ankit has invited you to a Multiplayer Quiz on Computer Networks.',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 4,
      type: 'challenge',
      icon: Target,
      title: 'Challenge from Friend',
      message: 'Aman scored 8/10 in the OS quiz – can you beat it?',
      time: '2 hours ago',
      unread: false
    },
    {
      id: 5,
      type: 'leaderboard',
      icon: Trophy,
      title: 'Leaderboard Update',
      message: '🔥 You\'re now #5 in the Algorithms category leaderboard!',
      time: '3 hours ago',
      unread: false
    },
    {
      id: 6,
      type: 'quiz_result',
      icon: Target,
      title: 'Quiz Completed',
      message: 'You scored 7/10 in Computer Architecture – Review answers now.',
      time: '5 hours ago',
      unread: false
    },
    {
      id: 7,
      type: 'daily_reminder',
      icon: Calendar,
      title: 'Daily Quiz Reminder',
      message: 'Don\'t forget your daily CS Quiz – Today\'s topic: Computer Networks.',
      time: '1 day ago',
      unread: false
    },
    {
      id: 8,
      type: 'reward',
      icon: Gift,
      title: 'Streak Reward',
      message: 'Congrats! You earned a badge for 3-day quiz streak.',
      time: '2 days ago',
      unread: false
    }
  ]);

  const user = {
    username: 'John Doe'
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationColor = (type) => {
    const colors = {
      new_quiz: 'bg-blue-50 border-blue-200',
      live_quiz: 'bg-red-50 border-red-200',
      multiplayer_request: 'bg-purple-50 border-purple-200',
      challenge: 'bg-orange-50 border-orange-200',
      leaderboard: 'bg-yellow-50 border-yellow-200',
      quiz_result: 'bg-green-50 border-green-200',
      daily_reminder: 'bg-indigo-50 border-indigo-200',
      reward: 'bg-pink-50 border-pink-200'
    };
    return colors[type] || 'bg-gray-50 border-gray-200';
  };

  const getIconColor = (type) => {
    const colors = {
      new_quiz: 'text-blue-600',
      live_quiz: 'text-red-600',
      multiplayer_request: 'text-purple-600',
      challenge: 'text-orange-600',
      leaderboard: 'text-yellow-600',
      quiz_result: 'text-green-600',
      daily_reminder: 'text-indigo-600',
      reward: 'text-pink-600'
    };
    return colors[type] || 'text-gray-600';
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div >
      {/* Notification Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center  justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Bell size={20} className="text-sky-500" />
                <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Actions */}
            {unreadCount > 0 && (
              <div className="p-3 border-b border-gray-100">
                <button
                  onClick={markAllAsRead}
                  className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                >
                  Mark all as read
                </button>
              </div>
            )}

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                          <IconComponent size={16} className={getIconColor(notification.type)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-medium ${
                              notification.unread ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </h4>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-sky-500 rounded-full ml-2 flex-shrink-0"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">
                              {notification.time}
                            </span>
                            <div className="flex space-x-2">
                              {notification.unread && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs text-sky-600 hover:text-sky-700"
                                >
                                  Mark as read
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="text-xs text-red-600 hover:text-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationModal;
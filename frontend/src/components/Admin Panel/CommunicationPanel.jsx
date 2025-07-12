import React, { useState } from 'react';
import { Megaphone, ChevronDown, ChevronRight, Wand2 } from 'lucide-react';
import axios from 'axios'
const CommunicationPanel = ({ expanded, toggleSection }) => {
  const [announcementMessage, setAnnouncementMessage] = useState('');
  // ...existing code...

  // Send announcement using backend API
  const sendAnnouncement = async () => {
    if (!announcementMessage.trim()) return;
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/Admin/sendAnnoucement`, { message: announcementMessage,
},{withCredentials:true})
      
      if (response.status===200) {
        alert('Announcement sent successfully!');
        setAnnouncementMessage("");
      } else {
        alert('Failed to send announcement.');
      }
    } catch (error) {
      alert('Error sending announcement.');
      console.error('Error sending announcement:', error);
    }
  };

  return (
    <section className="mb-10 bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
      <div
        onClick={() => toggleSection('communication')}
        className="flex items-center cursor-pointer p-5 bg-gradient-to-r from-rose-600 to-fuchsia-700 text-white rounded-t-2xl hover:from-rose-700 hover:to-fuchsia-800 transition-all duration-200"
      >
        {expanded ? (
          <ChevronDown className="w-6 h-6 text-rose-200" />
        ) : (
          <ChevronRight className="w-6 h-6 text-rose-200" />
        )}
        <Megaphone className="ml-3 w-7 h-7" />
        <h2 className="ml-4 text-2xl font-bold tracking-wide">Send Announcements & Notifications</h2>
      </div>
      {expanded && (
        <div className="p-6 space-y-6">
          <div>
            <label className="font-bold text-lg text-gray-700 block mb-3">Announcement Message</label>
            <div className="flex flex-col gap-3">
              <textarea
                value={announcementMessage}
                onChange={(e) => setAnnouncementMessage(e.target.value)}
                placeholder="Write your announcement message here..."
                className="w-full border border-gray-300 p-3 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-purple-400 text-base"
                rows="4"
              />
              <div className="flex justify-center">

                {/* Only Send Announcement button is shown */}
                <button
                  onClick={sendAnnouncement}
                  className="flex items-center bg-gradient-to-r from-pink-500 to-red-500
                   text-white px-6 py-3 rounded-lg shadow-md hover:from-pink-400 hover:to-red-400 transition-all duration-200 font-semibold text-lg"
                >
                  <Megaphone className="inline-block mr-2 w-5 h-5" />
                  Send Announcement
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommunicationPanel;
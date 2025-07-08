import React, { useState } from 'react';
import { Megaphone, ChevronDown, ChevronRight, Wand2 } from 'lucide-react';

const CommunicationPanel = ({ expanded, toggleSection }) => {
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [isDraftingAnnouncement, setIsDraftingAnnouncement] = useState(false);

  const draftAnnouncement = async () => {
    if (!announcementMessage.trim()) return;
    setIsDraftingAnnouncement(true);

    try {
      let chatHistory = [];
      const prompt = `Draft a concise and engaging announcement message based on the following key points: "${announcementMessage}". Make it suitable for a quiz app users. Keep it under 100 words.`;
      chatHistory.push({ role: 'user', parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ''; // Canvas will automatically provide the API key
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const text = result.candidates[0].content.parts[0].text;
        setAnnouncementMessage(text);
      } else {
        console.error('Gemini API response format unexpected:', result);
      }
    } catch (error) {
      console.error('Error drafting announcement:', error);
    } finally {
      setIsDraftingAnnouncement(false);
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
                placeholder="Write your announcement message or provide key points for a draft..."
                className="w-full border border-gray-300 p-3 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-purple-400 text-base"
                rows="4"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={draftAnnouncement}
                  className="flex-1 flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 font-semibold text-lg"
                  disabled={isDraftingAnnouncement}
                >
                  {isDraftingAnnouncement ? (
                    'Drafting...'
                  ) : (
                    <>
                      <Wand2 className="inline-block mr-2 w-5 h-5" /> Draft Announcement ✨
                    </>
                  )}
                </button>
                <button className="flex-1 flex items-center justify-center bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-all duration-200 font-semibold text-lg">
                  <Megaphone className="inline-block mr-2 w-5 h-5" /> Send Announcement
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
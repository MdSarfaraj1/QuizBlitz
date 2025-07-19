import { useEffect, useState } from 'react';
import { Users, Play, Loader2, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../Socket';
import { useAuth } from '../../Context/UserContextProvider';
const JoinRoomModal = ({ isOpen = false, onClose = () => {} }) => {
  const { roomId } = useParams();
  const navigate = useNavigate();
const {userId,username}=useAuth()
  const isStandalone = !!roomId && !isOpen; // !! converts anything to boolean

  const [roomIdInput, setRoomIdInput] = useState(roomId || '');
  const [joining, setJoining] = useState(false);

  const handleJoin = () => {
    if (!roomIdInput.trim()) {
      alert('Please enter a Room ID');
      return;
    }

    setJoining(true);
    socket.emit('join-room', { roomId: roomIdInput.trim(), userId ,username});
  };

  useEffect(() => {
    if (!isOpen && !isStandalone) return;

    socket.on('start-game', (quizData) => {
      navigate('/runningMultiplayerQuiz', { state: { quizData } });
    });

    socket.on('room-error', ({ message }) => {
      alert(message);
      setJoining(false);
    });

    return () => {
      socket.off('start-game');
      socket.off('room-error');
    };
  }, [navigate, isOpen, isStandalone]);

  // Only show when either modal is open or used standalone
  if (!isOpen && !isStandalone) return null;

  const content = (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-full max-w-md relative p-8 animate-fade-in">
      {!isStandalone && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
      )}
  
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-md">
          <Users className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Join Quiz Room</h2>
        <p className="text-gray-500 mt-1 text-sm">Enter a valid Room ID to join</p>
      </div>
  
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Room ID</label>
        <input
          type="text"
          placeholder="e.g., AB12CD"
          value={roomIdInput}
          onChange={(e) => setRoomIdInput(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>
  
      <button
        onClick={handleJoin}
        disabled={joining}
        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 text-white flex justify-center items-center gap-2 ${
          joining
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
        }`}
      >
        {joining ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Joining...
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
            Join Room
          </>
        )}
      </button>
    </div>
  );
  

  // If used as full page (e.g. from /joinRoom/:roomId)
  if (isStandalone) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4e1a94] via-[#2b1d85] to-[#1e2761] flex items-center justify-center p-6">
      {content}
    </div>
    
    );
  }

  // If used as modal
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      {content}
    </div>
  );
};

export default JoinRoomModal;

// components/Toast.js
import { useEffect } from "react";

export function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
      type === 'success' ? 'bg-green-600' : 
      type === 'error' ? 'bg-red-600' : 
      type === 'info' ? 'bg-blue-600' : 'bg-yellow-600'
    } text-white`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
      </div>
    </div>
  );
}

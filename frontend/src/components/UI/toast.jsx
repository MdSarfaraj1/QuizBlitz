// components/Toast.js
import { useEffect } from "react";

export function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded shadow text-white z-50 transition-all duration-300
        ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      {message}
    </div>
  );
}

import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">Q</span>
      </div>
      <span className="text-gray-800 font-medium text-xl">QuizeBlitz</span>
    </div>
  );
};

export default Logo;

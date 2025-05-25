import React, { useState, useRef } from "react";
import { Camera, UserCircle } from "lucide-react";

const UploadImage = ({ onAvatarChange }) => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
      console.error("Unsupported file type");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      console.error("File is too large (max 2MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result;
      setAvatarPreview(dataUrl);
      onAvatarChange(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    onAvatarChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group w-20 h-20 rounded-full overflow-hidden border-2 border-[#7c3bed] bg-gray-100">
        {avatarPreview ? (
          <img
            src={avatarPreview}
            alt="Profile avatar"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 bg-gray-100">
            <UserCircle className="w-8 h-8" />
          </div>
        )}

        <div
          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={triggerFileInput}
        >
          <Camera className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={triggerFileInput}
          className="text-sm text-[#7c3bed] hover:text-[#7c3bed]/70 font-medium"
        >
          {avatarPreview ? "Change Avatar" : "Upload Avatar"}
        </button>

        {avatarPreview && (
          <button
            type="button"
            onClick={removeAvatar}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Remove
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/gif,image/webp"
        className="hidden"
      />
    </div>
  );
};

export default UploadImage;

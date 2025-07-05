export const generateNewAvatar = () => {
    const seed = Math.random().toString(36).substring(2, 8);
    const newAvatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
    console.log("Generated new avatar URL:", newAvatarUrl);
    return newAvatarUrl;
  };
 
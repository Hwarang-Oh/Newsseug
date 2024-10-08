import { useState } from 'react';

function useImageChange() {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setProfileImage(file);
    }
  };

  const handleSaveImage = (newProfileImage: File) => {
    setProfileImage(newProfileImage);
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  return {
    profileImage,
    profileImageUrl,
    handleSelectImage,
    handleSaveImage,
    handleRemoveImage,
  };
}

export default useImageChange;

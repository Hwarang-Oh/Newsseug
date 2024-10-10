import { useState } from 'react';

function useImageChange() {
  /**
   * IMP : 사용자가 기본적으로 Input으로 넣는 Image File과 화면에 보여주는 Image Url을 다루고 있음
   */
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [profileImageCropped, setProfileImageCropped] = useState<File | null>(
    null,
  );
  const [profileImageCroppedUrl, setProfileImageCroppedUrl] = useState<
    string | null
  >(null);

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageUrl(URL.createObjectURL(file));
      setProfileImageCroppedUrl(URL.createObjectURL(file));
      setProfileImage(file);
    }
  };

  const handleSaveImage = (newProfileImage: File) => {
    setProfileImageCropped(newProfileImage);
    setProfileImageCroppedUrl(URL.createObjectURL(newProfileImage));
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setProfileImageUrl(null);
    setProfileImageCropped(null);
    setProfileImageCroppedUrl(null);
  };

  return {
    profileImage,
    profileImageUrl,
    profileImageCropped,
    profileImageCroppedUrl,
    handleSelectImage,
    handleSaveImage,
    handleRemoveImage,
  };
}

export default useImageChange;

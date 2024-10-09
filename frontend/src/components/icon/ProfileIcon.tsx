import { useRef, useState } from 'react';
import { ProfileImageProps } from 'types/props/register';
import ProfileIconDefault from 'components/icon/ProfileIconDefault';
import ProfileIconImage from 'components/icon/ProfileIconImage';
import ProfileIconSelect from 'components/icon/ProfileIconSelect';
import ProfileImageModal from 'components/register/ProfileImageModal';

function ProfileIcon({
  profileImageUrl,
  selectImage,
  saveImage,
  removeImage,
}: Readonly<ProfileImageProps>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleSelectImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageAdjustClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveImage = () => {
    setIsModalOpen(false);
  };
  const handleRemoveImage = () => {
    removeImage();
    setIsModalOpen(false);
  };

  return (
    <div>
      <svg
        width="114"
        height="108"
        viewBox="0 0 114 108"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="54"
          cy="54"
          r="53.25"
          fill={profileImageUrl ? `url(#profileImage)` : 'white'}
          onClick={handleImageAdjustClick}
          stroke="#D4D4D4"
          strokeWidth="1.5"
        />
        {!profileImageUrl && <ProfileIconDefault />}
        {profileImageUrl && <ProfileIconImage imgUrl={profileImageUrl} />}
        <ProfileIconSelect onClick={handleSelectImageClick} />
      </svg>
      {isModalOpen && profileImageUrl && (
        <ProfileImageModal
          profileImageUrl={profileImageUrl}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveImage}
          onRemove={handleRemoveImage}
        />
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={selectImage}
      />
    </div>
  );
}

export default ProfileIcon;

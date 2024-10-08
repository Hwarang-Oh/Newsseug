import styled from 'styled-components';
import { useState } from 'react';
import { ProfileImageModalProps } from 'types/props/register';

function ProfileImageModal({
  profileImage,
  onClose,
  onSave,
  onRemove,
}: Readonly<ProfileImageModalProps>) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e: MouseEvent) => {
    setPosition({
      x: position.x + e.movementX,
      y: position.y + e.movementY,
    });
  };

  const handleZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  const handleSave = () => {
    onSave(profileImage);
  };
  return (
    <ModalOverlay>
      <ModalContent>
        <ImageContainer
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
          onMouseDown={() => window.addEventListener('mousemove', handleDrag)}
          onMouseUp={() => window.removeEventListener('mousemove', handleDrag)}
        >
          <img src={profileImage} alt="Profile adjustment" />
        </ImageContainer>
        <Controls>
          <label>확대/축소:</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={scale}
            onChange={handleZoom}
          />
        </Controls>
        <ButtonContainer>
          <Button onClick={handleSave}>저장</Button>
          <Button onClick={onRemove}>사진 삭제</Button>
          <Button onClick={onClose}>취소</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ProfileImageModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ImageContainer = styled.div`
  max-width: 100%;
  max-height: 300px;
  cursor: grab;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 300px;
  }
`;

const Controls = styled.div`
  margin-top: 10px;

  label {
    margin-right: 10px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

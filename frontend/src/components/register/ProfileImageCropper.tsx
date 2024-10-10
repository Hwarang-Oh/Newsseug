import styled from 'styled-components';
import Snowflake from 'utils/snowflake';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import { useState, useRef, useEffect } from 'react';
import { centerAspectCrop, canvasPreview } from 'utils/imageCropUtils';
import { ProfileImageModalProps } from 'types/props/register';

function ProfileImageCropper({
  profileImageUrl,
  onClose,
  onSave,
  onRemove,
}: Readonly<ProfileImageModalProps>) {
  const snowflake = new Snowflake(1, 1);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number>(1);

  /**
   * IMP : Image Load Event
   * @param e
   */
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  /**
   * IMP : Download Crop Image Event
   */
  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop)
      throw new Error('Crop canvas does not exist');

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const canvas = document.createElement('canvas');
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No 2d context');

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/png'),
    );
    if (!blob) throw new Error('Failed to create blob');

    const newFile = new File([blob], `${snowflake.generate()}.png`, {
      type: 'image/png',
    });
    onSave(newFile);
  }

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );
      }
    }, 100);
    return () => {
      clearTimeout(handler);
    };
  }, [completedCrop, scale, rotate]);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ImageContainer>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            minWidth={400}
            minHeight={100}
            circularCrop
          >
            <img
              ref={imgRef}
              src={profileImageUrl}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </ImageContainer>
        {!!completedCrop && (
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                objectFit: 'contain',
                borderRadius: '50%',
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
        )}
        <ButtonContainer>
          <Button onClick={onDownloadCropClick}>저장하기</Button>
          <Button onClick={onClose}>돌아가기</Button>
          <Button onClick={onRemove}>삭제하기</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ProfileImageCropper;

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
  max-width: 400px;
  max-height: 400px;
  cursor: grab;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 300px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #58d7a2;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
`;

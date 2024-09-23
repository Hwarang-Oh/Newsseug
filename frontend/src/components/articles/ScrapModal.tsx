import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useAnimation, PanInfo } from 'framer-motion';
import scrapPlusIcon from 'assets/scrapPlusIcon.svg';
import scrapCheckIcon from 'assets/scrapCheckIcon.svg';
import { ScrapModalProps } from 'types/article';

const ScrapModal: React.FC<ScrapModalProps> = ({ isOpen, onRequestClose }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const y = useMotionValue(0);

  const windowHeight = window.innerHeight;
  const defaultHeight = windowHeight * 0.6;

  useEffect(() => {
    if (isOpen) {
      controls.start({ y: 0, height: defaultHeight });
      document.body.style.overflow = 'hidden';
    } else {
      controls.start({ y: '100%' });
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, controls]);

  const handleClick = () => {
    setIsChecked((prev) => !prev);
  };

  const handlePan = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (!contentRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const isAtTop = scrollTop <= 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight;

    if (isAtTop && info.delta.y > 0) {
      // 최상단에서 아래로 드래그
      controls.set({ y: Math.max(0, info.delta.y) });
    } else if (isAtBottom && info.delta.y < 0) {
      // 최하단에서 위로 드래그
      return;
    } else {
      // 중간에서 스크롤
      contentRef.current.scrollTop -= info.delta.y;
    }
  };

  const handlePanEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (!contentRef.current) return;

    const { scrollTop } = contentRef.current;
    const isAtTop = scrollTop <= 0;

    if (isAtTop && info.velocity.y > 20) {
      controls.start({ y: '100%' }).then(onRequestClose);
    } else {
      controls.start({ y: 0 });
    }
  };

  const handleOverlayClick = () => {
    controls.start({ y: '100%' }).then(onRequestClose);
  };

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      onClick={handleOverlayClick}
    >
      <ModalContent
        initial={{ y: '100%' }}
        animate={controls}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ height: defaultHeight }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={1}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <DraggableBar />
        <ModalHeader>
          <ModalTitle>추가할 폴더 선택</ModalTitle>
          <CreateScrap>
            <img src={scrapPlusIcon} alt="새 스크랩" />
            <span>새 스크랩</span>
          </CreateScrap>
        </ModalHeader>
        <ContentWrapper ref={contentRef}>
          <ModalBody>
            {[...Array(25)].map((_, index) => (
              <ScrapItem key={index}>
                <HiddenCheckbox />
                <StyledCheckbox checked={isChecked} onClick={handleClick}>
                  <svg width="16px" height="16px" viewBox="0 0 24 24">
                    <polyline
                      points="20 6 9 17 4 12"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </StyledCheckbox>
                <ScrapName>스크랩 {index + 1}</ScrapName>
              </ScrapItem>
            ))}
          </ModalBody>
        </ContentWrapper>
        <ModalFooter onClick={handleOverlayClick}>
          <img src={scrapCheckIcon} alt="완료 버튼" />
          <BtnText>완료</BtnText>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ScrapModal;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1001;
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.bgColor};
  border-radius: 10px;
  width: 90%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  margin: 20px 0;
`;

const ContentWrapper = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  overscroll-behavior: contain;
`;

const DraggableBar = styled.div`
  height: 3px;
  width: 50px;
  background: ${({ theme }) => theme.textColor + '99'};
  margin: 5px auto;
  border-radius: 8px;
`;

const ModalHeader = styled.div`
  height: 44px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.relaxColor.light};
  margin: 0;
  padding: 12px 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.bgColor};
  z-index: 1;
`;

const ModalTitle = styled.h1`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;

const CreateScrap = styled.button`
  border: none;
  outline: none;
  background: none;
  color: ${({ theme }) => theme.scrapModalColor};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  border-radius: 20px;
  &:active {
    background-color: ${({ theme }) => theme.textColor + '3b'};
    transition: none;
  }

  &:not(:active) {
    transition: background-color 0.5s;
  }
`;

const ModalBody = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const ScrapItem = styled.div`
  width: 100%;
  height: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  line-height: 20px;
  overflow: hidden;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${({ checked, theme }) =>
    checked ? theme.scrapModalColor : theme.bgColor};
  border-radius: 3px;
  border: 2px solid ${({ theme }) => theme.scrapModalColor};
  transition: all 150ms;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
    fill: ${({ theme }) => theme.bgColor};
  }
`;

const ScrapName = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ModalFooter = styled.button`
  height: 44px;
  width: 100%;
  margin: 0;
  padding: 12px 10px;
  box-sizing: border-box;
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.relaxColor.light};
  background: ${({ theme }) => theme.bgColor};
  outline: none;
  gap: 10px;
  &:active {
    background-color: ${({ theme }) => theme.textColor + '3b'};
    transition: 0.3s;
  }
`;

const BtnText = styled.span`
  color: ${({ theme }) => theme.textColor};
  font-size: 15px;
`;

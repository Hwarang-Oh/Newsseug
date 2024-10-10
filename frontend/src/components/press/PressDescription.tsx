import styled from 'styled-components';
import expandIcon from 'assets/expandIcon.svg';
import { useState, useRef, useEffect } from 'react';
import { PressDescriptionProps } from 'types/props/press';

function PressDescription({ description }: Readonly<PressDescriptionProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpandable, setIsExpandable] = useState<boolean>(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [descriptionHeight, setDescriptionHeight] = useState<number>(0);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (descriptionRef.current) {
      const currentHeight = descriptionRef.current.scrollHeight;
      setDescriptionHeight(currentHeight);
      setIsExpandable(currentHeight > 61.2); // 높이가 기준보다 클 때만 열고 닫기 버튼 표시
    }
  }, [description]);

  return (
    <Wrapper>
      <DescriptionText
        ref={descriptionRef}
        isOpen={isOpen}
        maxHeight={isOpen ? `${descriptionHeight}px` : '61.2px'}
      >
        {description}
      </DescriptionText>
      {isExpandable && (
        <OpenBtn onClick={handleOpen}>
          <BtnText>{isOpen ? '닫기' : '전체보기'}</BtnText>
          <BtnIcon isOpen={isOpen} src={expandIcon} />
        </OpenBtn>
      )}
    </Wrapper>
  );
}

export default PressDescription;

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 12px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  background: ${({ theme }) => theme.descriptionBgColor};
`;

const DescriptionText = styled.p<{ isOpen: boolean; maxHeight: string }>`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.textColor};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
  letter-spacing: -0.3px;

  max-height: ${({ maxHeight }) => maxHeight};
  transition: max-height 0.3s ease-out;
`;

const OpenBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  border-radius: 10px;
  padding: 1px 5px;
  &:active {
    background-color: ${({ theme }) => theme.relaxColor.main + 30};
    transition: 0.2s;
  }
`;

const BtnText = styled.span`
  color: ${({ theme }) => theme.relaxColor.main};
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
  letter-spacing: -0.275px;
`;

const BtnIcon = styled.img<{ isOpen: boolean }>`
  width: 12px;
  height: 12px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(-180deg)' : 'none')};
  transition: 0.2s;
`;

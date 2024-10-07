import styled from 'styled-components';

export const PressContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px 6px;
  gap: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const PressLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

export const LogoContainer = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 100%;
  border: 1px solid #f4f4f4;
  /* background: #fff; */
  background: ${({ theme }) => theme.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PressName = styled.p`
  text-align: center;
  font-size: 10px;
  font-weight: 500;
  line-height: 140%;
  color: ${({ theme }) => theme.textColor};
`;

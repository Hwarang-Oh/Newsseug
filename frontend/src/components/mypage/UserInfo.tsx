import { getMemberInfo } from 'apis/memberApi';
import { MemberInfo } from 'types/api/member';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit';
import { toggleDarkMode } from '../../redux/darkModeSlice';

function UserInfo() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode,
  );
  const [userInfo, setUserInfo] = useState<MemberInfo>();

  const handleUpdateUserInfo = (data: MemberInfo) => {
    setUserInfo(data);
  };

  const handleLogOut = () => {
    // 여기에 로그아웃 로직 추가
  };

  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMemberInfo();
        handleUpdateUserInfo(data);
      } catch (err) {
        console.log('사용자 정보 조회 실패', err);
      }
    };

    fetchData();
  }, []);

  if (!userInfo) {
    return <div>로딩 중</div>;
  }

  return (
    <Wrapper>
      <UserImg src={userInfo.profileImageUrl} />
      <InfoBox>
        <UserName>{userInfo.nickname}</UserName>
        <SubBox>
          <LogoutBtn onClick={handleLogOut}>로그아웃</LogoutBtn>
          <DarkModeBtn onClick={handleDarkMode}>
            <DarkModeText>
              {!isDarkMode ? '다크모드 ON' : '다크모드 OFF'}
            </DarkModeText>
          </DarkModeBtn>
        </SubBox>
      </InfoBox>
    </Wrapper>
  );
}

export default UserInfo;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  border: none;
  display: flex;
  width: 100%;
  height: fit-content;
  padding: 8px 0;
  align-items: center;
  gap: 12px;
`;

const UserImg = styled.img`
  display: flex;
  width: 62px;
  height: 62px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 999px;
  border: 0.1px solid ${({ theme }) => theme.relaxColor.main};
  background: ${({ theme }) => theme.bgColor};
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const UserName = styled.h1`
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.4px;
`;

const SubBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoutBtn = styled.a`
  color: ${({ theme }) => theme.relaxColor.littlelight};
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.25px;
  &:active {
    text-decoration: underline;
  }
`;

const DarkModeBtn = styled.button`
  border-radius: 5px;
  background: ${({ theme }) => theme.textColor};
  display: flex;
  padding: 3px;
  align-items: center;
`;

const DarkModeText = styled.p`
  color: ${({ theme }) => theme.bgColor};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.25px;
`;

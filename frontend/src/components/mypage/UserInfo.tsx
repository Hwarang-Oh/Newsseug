import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { MemberInfo } from 'types/api/member';
import { getMemberInfo } from 'apis/memberApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/darkModeSlice';
import { logout } from '../../redux/memberSlice';
import { RootState } from '@reduxjs/toolkit';
import ErrorSection from '../common/ErrorSection';

function UserInfo() {
  const [userInfo, setUserInfo] = useState<MemberInfo>();
  const naivagate = useNavigate();
  const dispatch = useDispatch();
  // const providerId = useSelector((state: RootState) => state.member.providerId);
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode,
  );

  const handleLogOut = async () => {
    if (dispatch(logout())) {
      naivagate('/login');
    }
  };

  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
  };
  useEffect(() => {
    const fetchData = async () => {
      setUserInfo(await getMemberInfo());
    };
    fetchData();
  }, []);

  return (
    <Wrapper>
      {userInfo ? (
        <>
          <UserImg src={userInfo.profileImageUrl} />
          <InfoBox>
            <UserName>{userInfo.nickname}</UserName>
            <SubBox>
              <LogoutBtn onClick={handleLogOut}>로그아웃</LogoutBtn>
              <DarkModeBtn onClick={handleDarkMode}>
                <DarkModeText>
                  {!isDarkMode ? '다크모드' : '라이트모드'}
                </DarkModeText>
              </DarkModeBtn>
            </SubBox>
          </InfoBox>
        </>
      ) : (
        <ErrorSection
          text="내 정보를 불러오는 데 실패했어요...😥"
          height="350px"
        />
      )}
    </Wrapper>
  );
}

export default UserInfo;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  border: none;
  display: flex;
  width: 100%;
  height: 95px;
  padding: 14px 0;
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

  cursor: pointer;
`;

const DarkModeBtn = styled.button`
  border-radius: 5px;
  background: ${({ theme }) => theme.textColor};
  display: flex;
  padding: 3px;
  align-items: center;
  cursor: pointer;
`;

const DarkModeText = styled.p`
  color: ${({ theme }) => theme.bgColor};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.25px;
`;

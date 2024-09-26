import { getMemberInfo } from 'apis/memberApi';
import { MemberInfo } from 'types/api/member';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function UserInfo() {
  const [userInfo, setUserInfo] = useState<MemberInfo>();
  const handleUpdateUserInfo = (data: MemberInfo) => {
    setUserInfo(data);
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
          <LogoutBtn>로그아웃</LogoutBtn>
        </SubBox>
      </InfoBox>
    </Wrapper>
  );
}

export default UserInfo;

const Wrapper = styled.div`
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
  gap: 12px;
  color: ${({ theme }) => theme.relaxColor.littlelight};
`;

const UserId = styled.span`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const LogoutBtn = styled.a`
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

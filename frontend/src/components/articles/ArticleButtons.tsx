import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import reportIcon from 'assets/reportIcon.svg';
import { ArticleButtonsProp } from 'types/props/articleVideo';

function ArticleButtons({
  likeInfo,
  dislikeInfo,
  handleScrapClick,
  handleReportClick,
}: Readonly<ArticleButtonsProp>) {
  const theme = useTheme();

  const [isLike, setIslike] = useState<boolean>(likeInfo.isLike);
  const [likeCount, setLikeCount] = useState<number>(likeInfo.likeCount);

  const [isDislike, setIsDislike] = useState<boolean>(dislikeInfo.isLike);
  const [dislikeCount, setDislikeCount] = useState<number>(
    dislikeInfo.likeCount,
  );

  const handleLike = () => {
    if (isDislike) {
      setIsDislike(!isDislike);
      setDislikeCount(dislikeCount - 1);
    }

    if (isLike) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }

    setIslike(!isLike);
  };

  const handleDislike = () => {
    if (isLike) {
      setIslike(!isLike);
      setLikeCount(likeCount - 1);
    }

    if (isDislike) {
      setDislikeCount(dislikeCount - 1);
    } else {
      setDislikeCount(dislikeCount + 1);
    }

    setIsDislike(!isDislike);
  };

  return (
    <ButtonContainer>
      <Button onClick={handleLike}>
        <Icon>
          <LikeIcon liked={isLike} theme={theme} />
        </Icon>
        <span>{likeCount}</span>
      </Button>
      <Button onClick={handleDislike}>
        <Icon>
          <DislikeIcon liked={isDislike} theme={theme} />
        </Icon>
        <span>{dislikeCount}</span>
      </Button>
      <Button onClick={handleScrapClick}>
        <Icon>
          <SaveIcon />
        </Icon>
        <span>저장하기</span>
      </Button>
      <Button onClick={handleReportClick}>
        <Icon>
          <img src={reportIcon} alt="Report" />
        </Icon>
        <span>신고하기</span>
      </Button>
    </ButtonContainer>
  );
}

export default ArticleButtons;

const ButtonContainer = styled.div`
  position: absolute;
  right: 0;
  top: 58%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.bgColor};
  gap: 4px;

  .span {
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
    font-size: 10px;
    font-weight: 600;
    line-height: 140%;
  }
`;

const Icon = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(2px);
  border-radius: 50%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
`;

const LikeIcon = ({ liked, theme }: { liked: boolean; theme: any }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill={liked ? theme.mainColor : 'white'}
  >
    <path d="M0 9.83171C0 8.70855 0.90296 7.79805 2.01682 7.79805H3.02523C3.58216 7.79805 4.03364 8.2533 4.03364 8.81488V18.9832C4.03364 19.5447 3.58216 20 3.02523 20H2.01682C0.90296 20 0 19.0895 0 17.9663V9.83171Z" />
    <path d="M6.05045 20H16.1976C17.3114 20 18.2144 19.0895 18.2144 17.9663V17.0516C18.2144 16.5681 18.3853 16.1003 18.6964 15.7323L19.3685 14.9373C19.8594 14.3567 19.9867 13.5478 19.6981 12.8425L19.5133 12.3906C19.3261 11.933 19.3108 11.4222 19.4704 10.954L19.8919 9.71773C20.0684 9.20007 20.0275 8.63218 19.7787 8.14566C19.4373 7.47803 18.7547 7.05854 18.0098 7.05854H11.187L12.2567 2.17783C12.4542 1.27626 11.9398 0.370966 11.0685 0.0869846C10.3023 -0.162748 9.46531 0.138472 9.02907 0.820963L5.36365 6.5554C5.1537 6.88386 5.04204 7.26636 5.04204 7.65714V18.9832C5.04204 19.5447 5.49352 20 6.05045 20Z" />
  </svg>
);

const DislikeIcon = ({ liked, theme }: { liked: boolean; theme: any }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M22 12.1683C22 13.2914 21.097 14.2019 19.9832 14.2019H18.9748C18.4178 14.2019 17.9664 13.7467 17.9664 13.1851V3.01683C17.9664 2.45525 18.4178 2 18.9748 2H19.9832C21.097 2 22 2.9105 22 4.03366V12.1683Z"
      fill={liked ? theme.mainColor : 'white'}
    />
    <path
      d="M15.9495 2H5.80243C4.68858 2 3.78562 2.9105 3.78562 4.03366V4.94836C3.78562 5.43194 3.61472 5.8997 3.3036 6.2677L2.63148 7.06268C2.14059 7.64332 2.01331 8.45218 2.30186 9.15752L2.4867 9.60937C2.67392 10.067 2.68915 10.5778 2.52956 11.046L2.1081 12.2823C1.93162 12.7999 1.97252 13.3678 2.22131 13.8543C2.5627 14.522 3.24527 14.9415 3.9902 14.9415H10.813L9.74335 19.8222C9.54577 20.7237 10.0602 21.629 10.9315 21.913C11.6977 22.1627 12.5347 21.8615 12.9709 21.179L16.6363 15.4446C16.8463 15.1161 16.958 14.7336 16.958 14.3429V3.01683C16.958 2.45525 16.5065 2 15.9495 2Z"
      fill={liked ? theme.mainColor : 'white'}
    />
  </svg>
);

const SaveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M16.799 2H7.20103C6.32054 2.038 5.49106 2.40807 4.89224 3.03005C4.29343 3.65203 3.97349 4.47585 4.00172 5.32308V21.2308C4.00175 21.3643 4.03789 21.4955 4.10661 21.6114C4.17532 21.7274 4.27424 21.8242 4.39364 21.8923C4.51523 21.9598 4.65315 21.9954 4.79355 21.9954C4.93395 21.9954 5.07188 21.9598 5.19347 21.8923L12 18.2615L18.8065 21.9C18.9261 21.9652 19.061 21.9996 19.1985 22C19.342 22 19.4829 21.9628 19.6064 21.8923C19.7258 21.8242 19.8247 21.7274 19.8934 21.6114C19.9621 21.4955 19.9983 21.3643 19.9983 21.2308V5.32308C20.0265 4.47585 19.7066 3.65203 19.1078 3.03005C18.5089 2.40807 17.6795 2.038 16.799 2Z"
      fill="white"
    />
  </svg>
);

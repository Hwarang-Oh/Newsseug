import styled from 'styled-components';
import likeIcon from 'assets/likeIcon.svg';
import dislikeIcon from 'assets/dislikeIcon.svg';
import saveIcon from 'assets/saveIcon.svg';
import reportIcon from 'assets/reportIcon.svg';

function ArticleButtons() {
  return (
    <ButtonContainer>
      <Button>
        <img src={likeIcon} alt="Like" />
        <span>1,000</span>
      </Button>
      <Button>
        <img src={dislikeIcon} alt="Dislike" />
        <span>1,000</span>
      </Button>
      <Button>
        <img src={saveIcon} alt="Save" />
        <span>스크랩</span>
      </Button>
      <Button>
        <img src={reportIcon} alt="Report" />
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
  color: white;
  gap: 4px;

  .span {
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
    font-size: 10px;
    font-weight: 600;
    line-height: 140%; /* 14px */
  }

  .svg {
    fill: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(2px);
  }
`;

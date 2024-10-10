import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function NoLoginSelect() {
  const navigate = useNavigate();

  return (
    <div>
      <NoLoginParagraph onClick={() => navigate('/')}>
        비로그인으로 계속하기
      </NoLoginParagraph>
    </div>
  );
}

export default NoLoginSelect;

const NoLoginParagraph = styled.p`
  display: flex;
  cursor: pointer;
  font-size: 16px;
  margin-top: 30px;
  justify-content: center;
  text-decoration: underline;
  color: ${({ theme }) => theme.relaxColor.main};
`;

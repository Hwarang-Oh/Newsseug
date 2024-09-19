import LogoIcon from 'components/icon/LogoIcon';
import styled from 'styled-components';

function LoginWord() {
  return (
    <StyledLoginWord>
      <LogoIcon size={220} />
    </StyledLoginWord>
  );
}

const StyledLoginWord = styled.div`
  display: flex;
  justify-content: center;
  margin-top: calc(26vh);
  gap: 15px;
`;

export default LoginWord;

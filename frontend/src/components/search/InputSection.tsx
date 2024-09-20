import styled from 'styled-components';
import SearchIconSvg from 'assets/searchIcon.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { InputSectionProps } from 'types/search';

function InputSection({ keywordText = '' }: Readonly<InputSectionProps>) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>(keywordText);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.currentTarget.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && keyword.trim()) {
      navigate(`/search/result?keyword=${keyword}`);
    }
  };
  return (
    <>
      <SearchIcon src={SearchIconSvg} />
      <TextInput
        placeholder="검색어를 입력해 주세요."
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={keyword}
      />
    </>
  );
}

export default InputSection;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const TextInput = styled.input`
  color: ${({ theme }) => theme.relaxColor.dark};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.35px;
  width: 100%;
  border: none;
  flex-grow: 1;
  &:focus {
    border: none;
    outline: none;
  }
`;

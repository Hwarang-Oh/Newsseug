import styled, { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InputSectionProps, KeywordItem } from 'types/props/search';

const STORAGE_KEY = 'searchHistory';

function InputSection({ keywordText = '' }: Readonly<InputSectionProps>) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [keyword, setKeyword] = useState<string>(keywordText);
  const [keywordHistoryList, setKeywordHistoryList] = useState<KeywordItem[]>(
    [],
  );

  useEffect(() => {
    const savedKeywords = localStorage.getItem(STORAGE_KEY);
    if (savedKeywords) {
      setKeywordHistoryList(JSON.parse(savedKeywords));
    }
  }, []);

  const addKeyword = (newKeyword: string) => {
    if (!newKeyword) return;

    const updatedKeywords = [
      { keywordText: newKeyword, isHistory: true },
      ...keywordHistoryList.filter((item) => item.keywordText !== newKeyword),
    ].slice(0, 10); // 최신 10개의 검색어만 저장

    setKeywordHistoryList(updatedKeywords);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedKeywords));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.currentTarget.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && keyword.trim()) {
      addKeyword(keyword);
      navigate(`/search/result?keyword=${keyword}`);
    }
  };
  return (
    <>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.1684 12.1844C8.62979 14.2177 4.91375 14.0577 2.56043 11.7043C0.0354176 9.17932 0.0354176 5.08545 2.56043 2.56044C5.08545 0.035417 9.17931 0.0354174 11.7043 2.56044C14.0576 4.91375 14.2177 8.62978 12.1844 11.1684L17.1229 16.1069C17.4035 16.3875 17.4035 16.8424 17.1229 17.1229C16.8424 17.4035 16.3875 17.4035 16.1069 17.1229L11.1684 12.1844ZM3.57642 10.6883C1.61252 8.72444 1.61252 5.54033 3.57642 3.57642C5.54032 1.61252 8.72444 1.61252 10.6883 3.57642C12.6508 5.53889 12.6522 8.71977 10.6927 10.684C10.6912 10.6854 10.6898 10.6869 10.6883 10.6883C10.6869 10.6898 10.6854 10.6912 10.684 10.6927C8.71977 12.6522 5.53889 12.6508 3.57642 10.6883Z"
          fill={theme.textColor}
        />
      </svg>

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
  background-color: ${({ theme }) => theme.bgColor};
`;

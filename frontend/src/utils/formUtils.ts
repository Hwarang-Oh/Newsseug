import { setMemberInfo } from '../redux/memberSlice';
import { AppDispatch, RootState } from '../redux/index';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomNickname } from '@woowa-babble/random-nickname';

const CreateRandomNickname = (): string => {
  const types = ['animals', 'characters', 'monsters'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  return getRandomNickname(randomType);
};

export const CalculateAge = (birthDate: string): number => {
  const today = new Date();
  const birthYear = parseInt(birthDate.substring(0, 4), 10);
  const birthMonth = parseInt(birthDate.substring(4, 6), 10);
  const birthDay = parseInt(birthDate.substring(6, 8), 10);
  let age = today.getFullYear() - birthYear;
  const hasHadBirthdayThisYear =
    today.getMonth() + 1 > birthMonth ||
    (today.getMonth() + 1 === birthMonth && today.getDate() >= birthDay);
  if (!hasHadBirthdayThisYear) age--;
  return age;
};

export const GetOrSetRandomNickname = (): string => {
  const dispatch = useDispatch<AppDispatch>();
  const member = useSelector((state: RootState) => state.member.member);
  if (member.nickname) return member.nickname;
  else {
    const newNickname = CreateRandomNickname();
    dispatch(setMemberInfo({ ...member, nickname: newNickname }));
    return newNickname;
  }
};

export const FormatDateToCompact = (dateString: string): string => {
  const regex = /^(\d{4})\.(\d{2})\.(\d{2})$/;
  const match = RegExp(regex).exec(dateString);
  if (match) {
    const [, year, month, day] = match;
    return `${year}${month}${day}`;
  } else {
    throw new Error('Invalid date format. Expected YYYY.MM.DD');
  }
};

export const birthRule = {
  required: '생년월일을 입력해 주세요.',
  pattern: {
    value: /^\d{4}\.\d{2}\.\d{2}$/,
    message: '생년월일 형식이 올바르지 않습니다. (YYYY.MM.DD)',
  },
  validate: {
    validDate: (value: string) => {
      const [year, month, day] = value.split('.').map(Number);
      const inputDate = new Date(year, month - 1, day);
      const today = new Date();
      const minDate = new Date(1900, 0, 1);

      if (month < 1 || month > 12) return '월은 1에서 12 사이여야 합니다.';
      if (day < 1 || day > new Date(year, month, 0).getDate())
        return `해당 월에는 ${new Date(year, month, 0).getDate()}일까지 있습니다.`;
      if (inputDate < minDate) return '1900년 이후의 날짜를 입력해주세요.';
      if (inputDate > today) return '미래 날짜는 선택할 수 없습니다.';

      return true;
    },
  },
};

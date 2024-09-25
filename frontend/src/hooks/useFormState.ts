import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerMember } from 'apis/memberApi';
import { UserInputProps } from 'types/register';
import { useNavigate } from 'react-router-dom';
import { formatDateToCompact } from 'utils/formatDateToCompact';
import { MaleIcon, FemaleIcon } from 'components/icon/GenderIcon';
import { getRandomNickname } from '@woowa-babble/random-nickname';

// TODO : 추후, Token유무와 비교해서 새로고침에 의한 생성 못하게 해야 할 수도 있음.
const randomNickname = (): string => {
  const types = ['animals', 'characters', 'monsters'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  return getRandomNickname(randomType);
};

const getOrSetRandomNickname = (): string => {
  const savedNickname = localStorage.getItem('randomNickname');
  if (savedNickname) {
    return savedNickname;
  } else {
    const newNickname = randomNickname();
    localStorage.setItem('randomNickname', newNickname);
    return newNickname;
  }
};

const defaultValues: UserInputProps = {
  nickname: getOrSetRandomNickname(),
  birth: '',
  gender: '',
};

/**
 * IMP : useFormState Custom Hook
 * @returns
 */
function useFormState() {
  const navigate = useNavigate();
  const { control, formState, setValue, trigger, getValues, handleSubmit } =
    useForm<UserInputProps>({
      defaultValues,
      mode: 'onChange',
    });

  const validationRules = {
    nickname: nicknameValidation,
    gender: genderValidation,
    birth: birthValidation,
  };

  const [genderList, setGenderList] = useState([
    { icon: MaleIcon(), selected: false, value: 'MALE' },
    { icon: FemaleIcon(), selected: false, value: 'FEMALE' },
  ]);

  const handleGenderSelect = async (index: number) => {
    setGenderList((prev) =>
      prev.map((item, i) => ({
        ...item,
        selected: i === index,
      })),
    );
    setValue('gender', genderList[index].value);
    await trigger('gender');
  };

  const handleDateChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (value.length > 4)
      value =
        `${value.slice(0, 4)}.${value.slice(4, 6)}` +
        (value.length > 6 ? `.${value.slice(6)}` : '');
    onChange(value);
    await trigger('birth');
  };

  const onSubmit = async (data: UserInputProps) => {
    data.birth = formatDateToCompact(data.birth);
    registerMember(data);
    if (await registerMember(data)) {
      navigate('/');
    } else {
      throw new Error('회원가입에 실패했습니다.');
    }
  };

  return {
    control,
    genderList,
    validationRules,
    formState,
    handleGenderSelect,
    handleDateChange,
    handleSubmit,
    onSubmit,
    getValues,
  };
}

const nicknameValidation = { fixedValue: getOrSetRandomNickname() };
const genderValidation = { required: true };
const birthValidation = {
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

export default useFormState;

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserInputProps } from '@/types/userInput';
import { MaleIcon, FemaleIcon } from 'components/icon/GenderIcon';
import { registerMember } from 'apis/memberApi';

const defaultValues: UserInputProps = {
  nickname: '기쁜 두꺼비',
  birth: '',
  gender: '',
};

function useFormState() {
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
    let value = e.target.value.replace(/\D/g, '').slice(0, 8); // Ensures only digits, truncated to 8
    if (value.length > 4)
      value =
        `${value.slice(0, 4)}.${value.slice(4, 6)}` +
        (value.length > 6 ? `.${value.slice(6)}` : '');
    onChange(value);
    await trigger('birth');
  };

  const onSubmit = (data: UserInputProps) => {
    registerMember(data);
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

const nicknameValidation = { fixedValue: '기쁜 두꺼비' };
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

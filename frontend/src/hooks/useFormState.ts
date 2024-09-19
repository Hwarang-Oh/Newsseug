import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserInputProps } from '@/types/userInput';
import { MaleIcon, FemaleIcon } from 'components/icon/GenderIcon';

const defaultValues: UserInputProps = {
  nickname: '기쁜 두꺼비',
  birthDate: '',
  gender: 0,
};

function useFormState() {
  const { control, setValue, handleSubmit, formState } =
    useForm<UserInputProps>({
      defaultValues,
      mode: 'onChange',
    });

  const [genderList, setGenderList] = useState([
    {
      icon: MaleIcon(),
      selected: false,
      value: 0,
    },
    {
      icon: FemaleIcon(),
      selected: false,
      value: 1,
    },
  ]);

  const handleGenderSelect = (index: number) => {
    setGenderList((prev) =>
      prev.map((item, i) => ({
        ...item,
        selected: i === index,
      })),
    );
    setValue('gender', genderList[index].value);
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자 이외의 문자 제거
    if (value.length > 4 && value.length <= 6) {
      onChange(value.slice(0, 4) + '.' + value.slice(4));
    } else if (value.length > 6) {
      onChange(
        value.slice(0, 4) + '.' + value.slice(4, 6) + '.' + value.slice(6),
      );
    } else {
      onChange(value);
    }
  };

  const onSubmit = (data: UserInputProps) => {
    console.log('Form Data:', data);
  };

  return {
    control,
    genderList,
    formState,
    handleGenderSelect,
    handleDateChange,
    handleSubmit,
    onSubmit,
  };
}

export default useFormState;

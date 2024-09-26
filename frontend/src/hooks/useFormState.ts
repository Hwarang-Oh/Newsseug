import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserInputProps } from 'types/register';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'redux/index';
import { useDispatch } from 'react-redux';
import { setMemberInfo } from '../redux/memberSlice';
import { registerMember } from 'apis/memberApi';
import { MaleIcon, FemaleIcon } from 'components/icon/GenderIcon';
import { getCookie, removeCookie } from 'utils/stateUtils';
import {
  GetOrSetRandomNickname,
  birthRule,
  FormatDateToCompact,
  CalculateAge,
} from 'utils/formUtils';

function useFormState() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const defaultValues: UserInputProps = {
    nickname: GetOrSetRandomNickname(),
    birth: '',
    gender: '',
  };

  const { control, formState, setValue, trigger, getValues, handleSubmit } =
    useForm<UserInputProps>({
      defaultValues,
      mode: 'onChange',
    });

  const validationRules = {
    nickname: { fixedValue: defaultValues.nickname },
    gender: { required: true },
    birth: birthRule,
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
    data.birth = FormatDateToCompact(data.birth);
    const age = CalculateAge(data.birth);
    dispatch(setMemberInfo({ ...data, age }));
    if (await registerMember(data)) {
      navigate(getCookie('redirect') || '/');
      removeCookie('redirect');
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

export default useFormState;

import Layout from 'components/common/Layout';
import InputSection from 'components/userInput/InputSection';
import GenderSelectBox from 'components/userInput/GenderSelectBox';
import SubmitButton from 'components/userInput/SubmitButton';
import useFormState from 'hooks/useFormState';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';

function UserInput() {
  const {
    control,
    genderList,
    handleGenderSelect,
    formState: { isValid },
    handleDateChange,
    handleSubmit,
    onSubmit,
  } = useFormState();

  return (
    <Layout>
      <FormStyle onSubmit={handleSubmit(onSubmit)}>
        <InputSectionStyle>
          <InputSection
            title="생성된 닉네임"
            input="기쁜 두꺼비"
            canEdit={false}
          />
          <GenderSelectBox
            title="성별을 선택해주세요"
            genderList={genderList}
            onSelect={handleGenderSelect}
          />

          <Controller
            name="birthDate"
            control={control}
            rules={{
              required: '생년월일을 입력해주세요.',
              pattern: {
                value: /^\d{4}.\d{2}.\d{2}$/,
                message: '생년월일 형식이 올바르지 않습니다. (YYYY.MM.DD)',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <InputSection
                title="생년월일을 입력해주세요"
                input={field.value}
                backGroundColor="#f4f4f4"
                onChange={(e) => handleDateChange(e, field.onChange)}
                error={error?.message}
              />
            )}
          />
        </InputSectionStyle>
        <SubmitButton disabled={!isValid} />
      </FormStyle>
    </Layout>
  );
}

export default UserInput;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
`;

const InputSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(5vh);
`;

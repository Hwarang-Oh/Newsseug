import styled from 'styled-components';
import useFormState from 'hooks/useFormState';
import Layout from 'components/common/Layout';
import InputSection from 'components/register/InputSection';
import GenderSelectBox from 'components/register/GenderSelectBox';
import SubmitButton from 'components/register/SubmitButton';
import ConfirmModal from 'components/register/ConfirmModal';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

function UserInput() {
  /**
   * IMP : useFormState에서 정의한 Custom Hook을 사용하여 Form을 구성
   */
  const {
    control,
    genderList,
    validationRules,
    formState: { isValid },
    handleGenderSelect,
    handleDateChange,
    handleSubmit,
    onSubmit,
    getValues,
  } = useFormState();

  /**
   * IMP : Modal Open 상태를 관리하는 State
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout>
      <FormStyle onSubmit={handleSubmit(onSubmit)}>
        <InputSectionStyle>
          <InputSection
            title="생성된 닉네임"
            input={validationRules.nickname.fixedValue}
            canEdit={false}
          />

          <Controller
            name="gender"
            control={control}
            rules={validationRules.gender}
            render={() => (
              <GenderSelectBox
                title="성별을 선택해주세요"
                genderList={genderList}
                onSelect={handleGenderSelect}
              />
            )}
          />

          <Controller
            name="birth"
            control={control}
            rules={validationRules.birth}
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

        <SubmitButton
          disabled={!isValid}
          onClick={() => setIsModalOpen(true)}
        />

        {isModalOpen && (
          <ConfirmModal
            userData={getValues()}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
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

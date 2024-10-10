import styled from 'styled-components';
import useFormState from 'hooks/useFormState';
import useImageChange from 'hooks/useImageChange';
import Layout from 'components/common/Layout';
import InputSection from 'components/register/InputSection';
import GenderSelectBox from 'components/register/GenderSelectBox';
import SubmitButton from 'components/register/SubmitButton';
import ConfirmModal from 'components/register/ConfirmModal';
import ProfileIcon from 'components/icon/ProfileIcon';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
function UserInput() {
  /**
   * IMP : useFormState에서 정의한 Custom Hook을 사용
   * 하여 Form을 구성
   */
  const {
    control,
    genderList,
    validationRules,
    formState: { isValid },
    setProfileImageFile,
    handleGenderSelect,
    handleDateChange,
    handleSubmit,
    onSubmit,
    getValues,
  } = useFormState();

  const {
    profileImage,
    profileImageUrl,
    profileImageCropped,
    profileImageCroppedUrl,
    handleSelectImage,
    handleSaveImage,
    handleRemoveImage,
  } = useImageChange();

  /**
   * IMP : Profile Image가 변경되었을 때, Profile Image를 Form에서 Update
   */
  useEffect(() => {
    if (profileImage) {
      setProfileImageFile(profileImage);
    }
    if (profileImageCropped) {
      setProfileImageFile(profileImageCropped);
    }
    if (!profileImage && !profileImageCropped) {
      setProfileImageFile(null);
    }
  }, [profileImage, profileImageCropped]);

  /**
   * IMP : Modal Open 상태를 관리하는 State
   */
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Layout>
      <RegisterHeader>
        <RegisterTitle>정보 등록</RegisterTitle>
      </RegisterHeader>
      <FormStyle onSubmit={handleSubmit(onSubmit)}>
        <InputSectionStyle>
          <ProfileWrapper>
            <ProfileIcon
              profileImageUrl={profileImageUrl}
              profileImageCroppedUrl={profileImageCroppedUrl}
              selectImage={handleSelectImage}
              saveImage={handleSaveImage}
              removeImage={handleRemoveImage}
            />
          </ProfileWrapper>
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
const RegisterHeader = styled.div`
  display: flex;
  padding: 13px 0px;
  justify-content: center;
  align-items: center;
`;

const RegisterTitle = styled.p`
  color: #202020;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
  letter-spacing: -0.4px;
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: calc(3vh);
  padding-bottom: calc(5vh);
  justify-content: space-between;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const InputSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(3vh);
  padding-bottom: calc(7.5vh);
`;

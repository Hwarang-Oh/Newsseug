export interface InputSectionProps {
  title: string;
  input?: string;
  backGroundColor?: string;
  canEdit?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export interface InputTitleProps {
  title: string;
}

export interface InputBoxProps {
  input?: string;
  backGroundColor?: string;
  canEdit?: boolean;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type GenderBoxProps = {
  icon: React.ReactNode;
  selected: boolean;
  onClick?: () => void;
};

export interface GenderSelectBoxProps {
  title: string;
  genderList: GenderBoxProps[];
  onSelect: (index: number) => void;
}

export interface ProfileImageProps {
  profileImageUrl: string | null;
  profileImageCroppedUrl: string | null;
  selectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveImage: (newImageFile: File) => void;
  removeImage: () => void;
}

export interface ProfileImageModalProps {
  profileImageUrl: string;
  profileImageCroppedUrl: string;
  onClose: () => void;
  onSave: (newImageFile: File) => void;
  onRemove: () => void;
}

/**
 * IMP : UserInputProps => 사용자의 정보를 등록하는 API의 Request Body Type
 */
export interface UserInputProps {
  nickname: string;
  gender: string;
  birth: string;
  profileImageUrl: string;
}

export interface SubmitButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export interface ConfirmModalProps {
  userData: UserInputProps;
  onCancel: () => void;
}

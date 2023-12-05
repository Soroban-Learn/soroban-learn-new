import { alertMessages } from '@/constants/alertMessages';
import { UserProfileUpdateParams } from '@/types';
import { UseFormSetValue } from 'react-hook-form';
import toast, { Themes } from 'react-simple-toasts';

type Props = {
  file: File;
  setValue: UseFormSetValue<UserProfileUpdateParams>;
};

export const fileUploading = ({ file, setValue }: Props) => {
  if (file.size > 5e6) {
    toast(alertMessages.fileSizeWarning, {
      theme: Themes.FAILURE,
      duration: 2000,
    });
  } else {
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;

      if (result && typeof result === 'string') {
        setValue('avatar', result);
      }
    };

    reader.readAsDataURL(file);
  }
};

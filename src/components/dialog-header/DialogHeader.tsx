import { DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { FC } from 'react';
import { styles } from './styles';

interface IProps {
  title: string;
  closeModal: () => void;
}

export const DialogHeader: FC<IProps> = ({ title, closeModal }) => {
  return (
    <DialogTitle>
      {title}
      <IconButton aria-label="close" onClick={closeModal} sx={styles.close}>
        <Close fontSize="small" />
      </IconButton>
    </DialogTitle>
  );
};

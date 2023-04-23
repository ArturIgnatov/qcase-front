import { ChangeEvent, FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from '@mui/material';
import { DialogHeader } from '../dialog-header/DialogHeader';

interface IProps {
  isVisible: boolean;
  title: string;
  description: string;
  originValue: string;
  closeModal: () => void;
  onRemove: () => void;
}

export const ConfirmModal: FC<IProps> = ({
  isVisible,
  title,
  description,
  originValue,
  closeModal,
  onRemove,
}) => {
  const [value, setValue] = useState('');

  const handleSetValue = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  return (
    <Dialog fullWidth open={isVisible} onClose={closeModal} maxWidth="xs">
      <DialogHeader {...{ closeModal, title }} />
      <DialogContent dividers>
        <DialogContentText>{description}</DialogContentText>
        <TextField
          value={value}
          margin="dense"
          id="name"
          sx={{ mb: 4, mt: 10 }}
          label="Name"
          fullWidth
          required
          aria-colcount={2}
          variant="outlined"
          onChange={handleSetValue}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={originValue !== value} onClick={onRemove}>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

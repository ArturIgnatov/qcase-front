import { ChangeEvent, FC, memo, PropsWithChildren } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface IProps {
  isVisible: boolean;
  title: string;
  description?: string;
  nameValue: string;
  descriptionValue: string;
  setNameValue: (text: string) => void;
  setDescriptionValue: (text: string) => void;
  maxNameValue?: number;
  maxDescriptionValue?: number;
  closeModal: () => void;
  onCreate: () => void;
}

export const CreateModal: FC<PropsWithChildren<IProps>> = memo(
  ({
    isVisible,
    title,
    description,
    nameValue,
    maxNameValue = 30,
    maxDescriptionValue = 100,
    descriptionValue,
    setNameValue,
    setDescriptionValue,
    onCreate,
    closeModal,
    children,
  }) => {
    const handleSetName = ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (target.value.trim().length > maxNameValue) {
        return;
      }

      setNameValue(target.value);
    };

    const handleSetDescription = ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (target.value.trim().length > maxDescriptionValue) {
        return;
      }

      setDescriptionValue(target.value);
    };

    return (
      <Dialog open={isVisible} sx={{ padding: 20 }} onClose={closeModal} maxWidth="xs">
        <DialogTitle>
          {title}
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 13,
              color: theme => theme.palette.grey[500],
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <TextField
            value={nameValue}
            margin="dense"
            id="name"
            sx={{ mb: 4, mt: 10 }}
            label="Name"
            fullWidth
            required
            aria-colcount={2}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">{`${
                  nameValue.trim().length
                } / ${maxNameValue}`}</InputAdornment>
              ),
            }}
            onChange={handleSetName}
          />
          <TextField
            value={descriptionValue}
            margin="dense"
            id="name"
            label="Description"
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{`${
                  descriptionValue.trim().length
                } / ${maxDescriptionValue}`}</InputAdornment>
              ),
            }}
            onChange={handleSetDescription}
          />
          {children}
        </DialogContent>
        <DialogActions sx={{ pl: 6, pr: 6, pb: 6 }}>
          <Button disabled={!nameValue.trim().length} onClick={onCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
);

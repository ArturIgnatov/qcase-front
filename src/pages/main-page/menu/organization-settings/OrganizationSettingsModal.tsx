import { FC, memo, useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  List,
} from '@mui/material';
import { styles } from './styles';
import ArticleIcon from '@mui/icons-material/Article';
import CloseIcon from '@mui/icons-material/Close';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TagIcon from '@mui/icons-material/Tag';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import { OrganizationModalContentSwitch } from './ContentsSwitch';

interface IProps {
  id: string;
  name: string;
  description: string;
  isVisible: boolean;
  closeModal: () => void;
}

const menu = [
  { id: 1, title: 'Main info', Icon: ArticleIcon },
  { id: 2, title: 'Projects', Icon: AccountTreeIcon },
  { id: 3, title: 'Users', Icon: GroupIcon },
  { id: 4, title: 'Tags', Icon: TagIcon },
  { id: 5, title: 'Remove', Icon: DeleteIcon },
];

export const OrganizationSettingsModal: FC<IProps> = memo(
  ({ id, name, description, isVisible, closeModal }) => {
    const [selectedId, setSelectedId] = useState(menu[0].id);

    return (
      <Dialog
        fullWidth
        maxWidth="md"
        sx={{ '& .MuiDialog-paper': { minHeight: 500, maxHeight: 500 } }}
        open={isVisible}
        onClose={closeModal}
      >
        <DialogTitle>
          Organization settings
          <IconButton aria-label="close" onClick={closeModal} sx={styles.close}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={styles.dialog} dividers>
          <Stack
            direction="row"
            sx={styles.grow}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <List sx={styles.grow}>
              {menu.map(el => (
                <ListItem key={el.id} disablePadding selected={selectedId === el.id}>
                  <ListItemButton onClick={() => setSelectedId(el.id)}>
                    <ListItemIcon sx={styles.listIcon}>
                      <el.Icon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={el.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Box sx={styles.content}>
              <OrganizationModalContentSwitch {...{ id, name, description, selectedId }} />
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    );
  },
);

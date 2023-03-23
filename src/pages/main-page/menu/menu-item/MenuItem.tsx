import { FC, memo, PropsWithChildren, ReactNode } from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface IMenuItemProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  secondaryAction?: ReactNode;
  divider?: boolean;
  selected?: boolean;
}

export const MenuItem: FC<PropsWithChildren<IMenuItemProps>> = memo(
  ({ text, secondaryAction, onClick, disabled = false, selected = false, divider, children }) => {
    return (
      <ListItem disablePadding {...{ secondaryAction, divider }}>
        <ListItemButton {...{ onClick, selected, disabled }}>
          <ListItemIcon>{children}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    );
  },
);

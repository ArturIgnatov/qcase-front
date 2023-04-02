import { ComponentProps, FC } from 'react';
import { Chip, Theme } from '@mui/material';
import { SxProps } from '@mui/system/styleFunctionSx';

interface IProps {
  label: string;
  color?: string;
  onClick?: () => void;
  onDelete?: () => void;
  sx?: SxProps<Theme>;
  size?: ComponentProps<typeof Chip>['size'];
}

export const AppChip: FC<IProps> = ({ label, size, color, onClick, onDelete, sx }) => {
  return <Chip {...{ label, onClick, onDelete, size }} sx={{ background: color, ...(sx ?? {}) }} />;
};

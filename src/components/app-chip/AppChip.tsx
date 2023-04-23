import React, { ComponentProps, FC, useCallback } from 'react';
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
  const handleOnClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onClick?.();
    },
    [onClick],
  );

  return (
    <Chip
      {...{ label, onDelete, size }}
      onClick={onClick ? handleOnClick : undefined}
      sx={{ background: color, ...(sx ?? {}) }}
    />
  );
};

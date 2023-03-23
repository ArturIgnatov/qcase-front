import { SxProps } from '@mui/system/styleFunctionSx';

export const createStyles = <T extends { [key in keyof T]: SxProps }>(data: {
  [key in keyof T]: SxProps;
}) => data;

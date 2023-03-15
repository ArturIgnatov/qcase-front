import { SxProps } from '@mui/system/styleFunctionSx';

export const createStyles = <T>(data: { [key in keyof T]: SxProps }) => data;

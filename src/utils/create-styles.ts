import { SxProps } from '@mui/system/styleFunctionSx';
import { Theme } from '@mui/system/createTheme';

export const createStyles = <T extends { [key in keyof T]: SxProps<Theme> }>(data: T) => data;

import { FC } from 'react';
import { Box, colors, Grid, Paper, styled, Zoom } from '@mui/material';
import { Check } from '@mui/icons-material';

interface IProps {
  selected?: string;
  usePaper?: boolean;
  bordered?: boolean;
  disableSpacing?: boolean;
  onChange?: (color: string) => void;
}

const COLORS = Object.entries(colors).reduce<string[]>((acc, [key, value]) => {
  if (key !== 'common' && '500' in value) {
    acc.push(value['500']);
  }

  return acc;
}, []);

export const ColorPicker: FC<IProps> = ({
  selected,
  bordered = true,
  usePaper = true,
  disableSpacing = false,
  onChange,
}) => {
  return (
    <Paper
      elevation={usePaper ? 4 : 0}
      sx={[{ width: 140, p: 2 }, !usePaper && { background: 'transparent' }]}
    >
      <Grid
        container
        rowSpacing={disableSpacing ? 0 : 1}
        columnSpacing={disableSpacing ? 0 : 1}
        justifyContent="center"
      >
        {COLORS.map((color, idx) => (
          <Grid key={idx} item xs={3}>
            <Item
              sx={[{ background: color }, !!bordered && { borderRadius: 20 }]}
              onClick={() => onChange?.(color)}
            >
              <Zoom in={color === selected}>
                <Check fontSize="small" />
              </Zoom>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

const Item = styled(Box)(() => ({
  height: 28,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    border: '1px solid white',
  },
}));

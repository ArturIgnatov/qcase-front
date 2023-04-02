import { FC, memo, PropsWithChildren } from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './styles';
import Lottie from 'lottie-react';

interface IProps {
  title: string;
  description?: string;
}

export const EmptyPlaceholder: FC<PropsWithChildren<IProps>> = memo(
  ({ title, description, children }) => {
    return (
      <Box sx={styles.container}>
        <Lottie
          style={styles.animation}
          height={100}
          animationData={require('../../assets/animations/empty.json')}
        />
        <Typography sx={styles.title} variant="h6">
          {title}
        </Typography>
        {!!description && (
          <Typography sx={styles.description} variant="subtitle2">
            {description}
          </Typography>
        )}
        {children}
      </Box>
    );
  },
);

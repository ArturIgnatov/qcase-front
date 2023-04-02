import { FC, memo } from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './styles';
import Lottie from 'lottie-react';

interface IProps {
  title: string;
  description?: string;
}

export const JobPlaceholder: FC<IProps> = memo(({ title }) => {
  return (
    <Box sx={styles.container}>
      <Lottie
        style={styles.animation}
        animationData={require('../../assets/animations/in-progress.json')}
      />
      <Typography sx={styles.title} variant="h6">
        {title}
      </Typography>
      <Typography sx={styles.description} variant="subtitle1">
        Sorry this feature is currently under development
      </Typography>
    </Box>
  );
});

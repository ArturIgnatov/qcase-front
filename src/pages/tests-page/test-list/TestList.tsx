import { FC, memo } from 'react';
import { Box, Collapse, List } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { GlobalTestsQuery } from '../../../apollo/queries-generated-types';
import { TestItem } from './TestItem';
import { styles } from './styles';

interface IProps {
  tests: GlobalTestsQuery['tests'];
}

export const TestList: FC<IProps> = memo(({ tests }) => {
  return (
    <Box sx={styles.container}>
      <List>
        <TransitionGroup appear>
          {tests.map(el => (
            <Collapse key={el.id}>
              <TestItem {...el} />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Box>
  );
});

import { FC, memo } from 'react';
import { Box, Collapse, List } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

interface IProps {
  testCases: any[];
}

export const TestCaseList: FC<IProps> = memo(({ testCases }) => {
  return (
    <List sx={{ flexGrow: 1, pt: 18 }}>
      <TransitionGroup appear>
        {testCases?.map(el => (
          <Collapse key="1">
            <Box />
          </Collapse>
        ))}
      </TransitionGroup>
    </List>
  );
});

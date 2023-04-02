import { FC } from 'react';
import { Collapse, List } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { GlobalCasesQuery } from '../../../apollo/queries-generated-types';
import { CaseItem } from './CaseItem';

interface IProps {
  loading: boolean;
  cases: GlobalCasesQuery['cases'] | undefined;
}

export const CaseList: FC<IProps> = ({ cases }) => {
  return (
    <List sx={{ flexGrow: 1, pt: 18, bgcolor: 'background.default' }}>
      <TransitionGroup>
        {cases?.map(el => (
          <Collapse key={el.id}>
            <CaseItem {...el} />
          </Collapse>
        ))}
      </TransitionGroup>
    </List>
  );
};

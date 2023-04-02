import { FC, memo } from 'react';
import { Collapse, List } from '@mui/material';
import { GlobalProjectsQuery } from '../../../../../apollo/queries-generated-types';
import { TransitionGroup } from 'react-transition-group';
import { ProjectItem } from './ProjectItem';

interface IProps {
  projects: GlobalProjectsQuery['projects'];
}

export const ProjectsList: FC<IProps> = memo(({ projects }) => {
  return (
    <List sx={{ flexGrow: 1 }}>
      <TransitionGroup appear>
        {projects.map(el => (
          <Collapse key={el.id}>
            <ProjectItem {...el} />
          </Collapse>
        ))}
      </TransitionGroup>
    </List>
  );
});

import { FC } from 'react';
import { Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { GlobalTagsQuery } from '../../../../../apollo/queries-generated-types';
import { TagItem } from './TagItem';
import { styles } from './styles';

interface IProps {
  tags: GlobalTagsQuery['tags'];
}

export const TagsList: FC<IProps> = ({ tags }) => {
  return (
    <TransitionGroup style={styles.list}>
      {tags.map(el => (
        <Collapse key={el.id} orientation="horizontal">
          <TagItem {...el} />
        </Collapse>
      ))}
    </TransitionGroup>
  );
};

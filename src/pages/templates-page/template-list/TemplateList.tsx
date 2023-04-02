import { FC, memo } from 'react';
import { Box, Collapse, List } from '@mui/material';
import { GlobalTemplatesQuery } from '../../../apollo/queries-generated-types';
import { styles } from './styles';
import { TemplateItem } from './TemplateItem';
import { TransitionGroup } from 'react-transition-group';

interface IProps {
  loading: boolean;
  templates: GlobalTemplatesQuery['templates'] | undefined;
}

export const TemplateList: FC<IProps> = memo(({ templates }) => {
  return (
    <Box sx={styles.container}>
      <List>
        <TransitionGroup>
          {templates?.map(el => (
            <Collapse key={el.id}>
              <TemplateItem {...el} />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Box>
  );
});

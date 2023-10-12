import {
  Card,
  CardHeader,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { FC, memo } from 'react';
import { CasesSelectListQuery } from '../../../../../apollo/queries-generated-types';

interface IProps {
  title: string;
  items: CasesSelectListQuery['cases'];
  selected: string[];
  handleSelectAll: () => void;
  onSelect: (id: string) => void;
}

export const CustomList: FC<IProps> = memo(
  ({ title, items, onSelect, selected, handleSelectAll }) => {
    const isAllChecked = selected.length === items.length && items.length !== 0;

    return (
      <Card>
        <CardHeader
          sx={{ px: 2, py: 3 }}
          avatar={
            <Checkbox
              onClick={handleSelectAll}
              checked={isAllChecked}
              indeterminate={isAllChecked}
              disabled={items.length === 0}
              inputProps={{
                'aria-label': 'all items selected',
              }}
            />
          }
          {...{ title }}
          subheader={`${selected.length}/${items.length} selected`}
        />
        <Divider />
        <List
          sx={{
            width: 300,
            minHeight: 300,
            bgcolor: 'background.paper',
            overflow: 'auto',
          }}
          dense
          component="div"
          role="list"
        >
          {items.map(_case => {
            const labelId = `transfer-list-all-item-${_case.id}-label`;

            return (
              <ListItem key={_case.id} disablePadding role="listitem">
                <ListItemButton sx={{ padding: 2 }} dense onClick={() => onSelect(_case.id)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={selected.includes(_case.id)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={_case.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Card>
    );
  },
);

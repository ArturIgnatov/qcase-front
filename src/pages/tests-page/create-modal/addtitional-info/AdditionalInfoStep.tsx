import { FC, memo, useMemo } from 'react';
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { TemplatesSelectListQuery } from '../../../../apollo/queries-generated-types';

interface IProps {
  selectedTemplates: string[];
  templates?: TemplatesSelectListQuery['templates'];
  handleChangeTemplates: (event: SelectChangeEvent<string[]>) => void;
}

export const AdditionalInfoStep: FC<IProps> = memo(
  ({ selectedTemplates, templates, handleChangeTemplates }) => {
    const templateNames = useMemo(
      () =>
        (templates ?? []).reduce<Record<string, string>>((acc, item) => {
          acc[item.id] = item.name;
          return acc;
        }, {}),
      [templates],
    );

    return (
      <Box sx={{ width: '50%' }}>
        <FormControl sx={{ mt: 4 }} fullWidth>
          <InputLabel id="template-label">Templates</InputLabel>
          <Select
            labelId="template-label"
            id="template"
            value={selectedTemplates}
            label="Templates"
            multiple
            onChange={handleChangeTemplates}
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {selected.map(value => (
                  <Chip size="small" key={value} label={templateNames[value]} />
                ))}
              </Box>
            )}
          >
            {templates?.map(el => (
              <MenuItem key={el.id} value={el.id}>
                <Checkbox checked={selectedTemplates.indexOf(el.id) > -1} />
                <ListItemText primary={el.name} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select templates for select cases for next step</FormHelperText>
        </FormControl>
      </Box>
    );
  },
);

import { FC, memo, SyntheticEvent, useCallback } from 'react';
import { Autocomplete, AutocompleteRenderInputParams, Stack, TextField } from '@mui/material';
import { AppChip } from '../app-chip/AppChip';

interface IProps {
  selected: IUiTag[];
  tags: IUiTag[] | undefined;
  onSetTag: (selected: IProps['selected']) => void;
  onRemoveTag: (id: string) => void;
}
export type TagsAutoCompleteProps = NonNullable<IProps>;

interface IUiTag {
  id: string;
  title: string;
  color: string;
}

export const TagsAutoComplete: FC<IProps> = memo(
  ({ tags = [], selected, onSetTag, onRemoveTag }) => {
    const handleSetTags = useCallback(
      (event: SyntheticEvent, newValue: IUiTag[]) => {
        onSetTag(newValue);
      },
      [onSetTag],
    );

    const handleRemoveTag = useCallback(
      (id: string) => {
        onRemoveTag(id);
      },
      [onRemoveTag],
    );

    const renderTags = useCallback(
      (selected: IUiTag[]) => {
        return (
          <Stack direction="row" gap={2} flexWrap="wrap">
            {selected.map(el => (
              <AppChip
                key={el.id}
                label={el.title}
                color={el.color}
                size="small"
                onDelete={() => handleRemoveTag(el.id)}
              />
            ))}
          </Stack>
        );
      },
      [handleRemoveTag],
    );

    const renderInput = useCallback((params: AutocompleteRenderInputParams) => {
      return (
        <TextField
          {...params}
          variant="outlined"
          label="Tags"
          placeholder="Search..."
          helperText="You can add tags for quick search later"
        />
      );
    }, []);

    return (
      <Autocomplete
        multiple
        openOnFocus
        id="tags-standard"
        value={selected}
        options={tags ?? []}
        getOptionLabel={option => option.title}
        onChange={handleSetTags}
        {...{ renderTags, renderInput }}
      />
    );
  },
);

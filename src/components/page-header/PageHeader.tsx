import { ChangeEvent, FC, Fragment, memo, useCallback, useState } from 'react';
import { Box, Button, Divider, IconButton, TextField } from '@mui/material';
import { styles } from './styles';
import { Search, Sort } from '@mui/icons-material';

interface IProps {
  buttonText: string;
  onClickButton: () => void;
  onSearch?: (value: string) => void;
  onSort?: () => void;
}

export const PageHeader: FC<IProps> = memo(({ buttonText, onClickButton, onSearch, onSort }) => {
  const [search, setSearch] = useState('');

  const onChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setSearch(target.value);
      onSearch?.(target.value);
    },
    [onSearch],
  );

  return (
    <Fragment>
      <Box sx={styles.header}>
        <Box sx={styles.header__start}>
          <IconButton onClick={onSort}>
            <Sort />
          </IconButton>
          {/*<IconButton sx={styles.header__filterIcon}>*/}
          {/*  <FilterList />*/}
          {/*</IconButton>*/}
          <TextField
            sx={styles.header__search}
            value={search}
            placeholder="Search..."
            size="small"
            variant="outlined"
            onChange={onChange}
            InputProps={{
              startAdornment: <Search sx={styles.header__searchIcon} />,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box>
          <Button onClick={onClickButton} variant="contained">
            {buttonText}
          </Button>
        </Box>
      </Box>
      <Divider />
    </Fragment>
  );
});

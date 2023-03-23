import { FC, Fragment, memo, useCallback, useState } from 'react';
import { IconButton } from '@mui/material';
import { Add, CorporateFare } from '@mui/icons-material';
import { MenuItem } from '../menu-item/MenuItem';
import { OrganizationModal } from '../../../../components/organization-modal/OrganizationModal';

interface IProps {
  disabled: boolean;
  collapseOrganization: () => void;
}

export const CreateOrganization: FC<IProps> = memo(({ disabled, collapseOrganization }) => {
  const [createOpened, setCreateOpened] = useState(false);

  const toggleCreateOpened = useCallback(() => {
    setCreateOpened(prevState => !prevState);
  }, []);

  return (
    <Fragment>
      <MenuItem
        text="Organizations"
        divider
        disabled={disabled}
        onClick={collapseOrganization}
        secondaryAction={
          <IconButton onClick={toggleCreateOpened}>
            <Add />
          </IconButton>
        }
      >
        <CorporateFare />
      </MenuItem>
      <OrganizationModal isVisible={createOpened} closeModal={toggleCreateOpened} />
    </Fragment>
  );
});

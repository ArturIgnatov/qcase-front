import { FC, memo } from 'react';
import { OrganizationMainSettings } from './main-settings/OrganizationMainSettings';
import { OrganizationProjects } from './projects/OrganizationProjects';
import { OrganizationUsers } from './users/OrganizationUsers';
import { OrganizationTags } from './tags/OrganizationTags';
import { RemoveOrganization } from './remove/RemoveOrganization';

interface IProps {
  id: string;
  name: string;
  description: string;
  selectedId: number;
}

export const OrganizationModalContentSwitch: FC<IProps> = memo(
  ({ id, name, description, selectedId }) => {
    switch (selectedId) {
      case 1:
        return <OrganizationMainSettings {...{ id, name, description }} />;
      case 2:
        return <OrganizationProjects {...{ id }} />;
      case 3:
        return <OrganizationUsers {...{ id }} />;
      case 4:
        return <OrganizationTags {...{ id }} />;
      case 5:
        return <RemoveOrganization {...{ id, name }} />;
      default:
        return <div />;
    }
  },
);

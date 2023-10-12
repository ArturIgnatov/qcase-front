import { useQuery } from '@apollo/client';
import {
  GlobalOrganizationUsersQuery,
  GlobalOrganizationUsersQueryVariables,
} from '../apollo/queries-generated-types';
import { GLOBAL_ORGANIZATION_USERS } from '../apollo/queries';

export const useOrganizationUsers = (organizationId: string) => {
  return useQuery<GlobalOrganizationUsersQuery, GlobalOrganizationUsersQueryVariables>(
    GLOBAL_ORGANIZATION_USERS,
    {
      variables: {
        data: {
          organizationId,
        },
      },
    },
  );
};

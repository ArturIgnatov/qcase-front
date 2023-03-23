import { gql } from '@apollo/client';

export const GET_GLOBAL_USER = gql`
  query GlobalUser($id: String!) {
    user(id: $id) {
      id
      fname
      lname
    }
  }
`;

export const GET_GLOBAL_ORGANIZATIONS = gql`
  query GlobalOrganization($filters: OrganizationFiltersInput) {
    organizations(filters: $filters) {
      id
      name
      description
    }
  }
`;
